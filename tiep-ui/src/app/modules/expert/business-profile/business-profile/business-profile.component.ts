import { Component, OnInit } from '@angular/core';
import { BusinessDTO, User } from '../../../../services/business/business-dto.model';
import { BusinessService } from '../../../../services/business/business.service';
import { TokenService } from '../../../../services/token/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from "../../../../services/services/authentication.service";
import { GetUserByEmail$Params } from "../../../../services/fn/authentication/get-user-by-email";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";
import {ExpertiseDTO} from "../../../../services/expertise/expertise-dto.model";
import {ReviewService} from "../../../../services/review/review.service";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {
  businessInfo: BusinessDTO[];
  businessName: string;
  businessLocation: string;
  businessIndustry: string;
  businessCreationDate: string;
  businessLogo: string;
  contactEmail: string;
  firstName: string;
  showCreateForm: boolean = false;
  showUploadLogoForm: boolean = false;
  showUpdateForm: boolean = false; // Add this property
  createBusinessForm: FormGroup;
  updateBusinessForm: FormGroup; // Add this property
  createdBusinessId: number;
  createSkillForm: FormGroup;
  showCreateSkillForm = false;
  skills: ExpertiseDTO[] = [];
  updateSkillForm: FormGroup;
  showUpdateSkillForm = false;
  showUploadSkillForm = false; // Added property
  selectedSkill: ExpertiseDTO | null = null;
  reviews: any[] = [];
  reviewees: { [key: string]: any } = {};

  constructor(
    private businessService: BusinessService,
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private http: HttpClient,
    private expertiseService: ExpertiseService
  ) {
    this.createBusinessForm = this.fb.group({
      bizname: ['', Validators.required],
      location: ['', Validators.required],
      industry: ['', Validators.required],
      dateOfBizCreation: ['', Validators.required],
      businessLogo: [null]
    });

    this.updateBusinessForm = this.fb.group({
      bizname: ['', Validators.required],
      location: ['', Validators.required],
      industry: ['', Validators.required],
      dateOfBizCreation: ['', Validators.required]
    });

    this.createSkillForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      minProposedPrice: ['', Validators.required],
      maxProposedPrice: ['', Validators.required],
    });


    this.updateSkillForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    const tokenExists = !!this.tokenService.token;
    if (tokenExists) {
      const userEmail = this.tokenService.getUserEmailFromToken();
      if (userEmail) {
        this.businessService.getBusinessesByUserEmail(userEmail).subscribe(
          (businesses: BusinessDTO[]) => {
            if (businesses.length > 0) {
              this.businessInfo = businesses;
              const business = businesses[0];
              this.businessName = business.bizname;
              this.businessLocation = business.location;
              this.businessIndustry = business.industry;
              this.businessCreationDate = new Date(business.dateOfBizCreation).toLocaleDateString();
              this.businessLogo = business.businessLogo;
              this.contactEmail = userEmail;
              this.firstName = business.user.firstname;
              this.showUploadLogoForm = false;
              this.createdBusinessId = business.id;

              // Load skills for the business if the business ID exists
              if (this.createdBusinessId) {
                this.loadSkills(this.createdBusinessId);
                this.getBusinessReviews();
              }
            } else {
              this.showCreateForm = true;
              this.showUploadLogoForm = false;
            }


          },
          (error) => {
            console.error('Error fetching business information:', error);
          }
        );
      } else {
        console.error('User email not found.');
      }
    } else {
      console.error('Token not found. User not authenticated.');
    }

  }


  onSubmit() {
    if (this.createBusinessForm.valid) {
      const userEmail = this.tokenService.getUserEmailFromToken();
      if (userEmail) {
        const params: GetUserByEmail$Params = {email: userEmail};
        this.authenticationService.getUserByEmail(params).subscribe(
          (response: any) => {
            this.parseBlobToJson(response).then((user: User) => {
              if (user && user.id) {
                const biz: any = {
                  userId: user.id,
                  bizname: this.createBusinessForm.value.bizname,
                  dateOfBizCreation: this.createBusinessForm.value.dateOfBizCreation,
                  industry: this.createBusinessForm.value.industry,
                  location: this.createBusinessForm.value.location,
                };
                this.createAndUploadBusiness(biz);

              } else {
                console.error('User ID not found for email:', userEmail);
              }
            }).catch((error: any) => {
              console.error('Error parsing response:', error);
            });
          },
          (error: HttpErrorResponse) => {
            console.error('Error retrieving user:', error);
          }
        );
      } else {
        console.error('User email not found.');
      }
    }

  }

  parseBlobToJson(blob: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(blob);
    });
  }

  createAndUploadBusiness(biz: any) {
    this.businessService.createBusiness(biz).subscribe(
      () => {
        this.fetchBusinessDetails();
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating business:', error);
      }
    );
  }

  fetchBusinessDetails() {
    const userEmail = this.tokenService.getUserEmailFromToken();
    if (userEmail) {
      this.businessService.getBusinessesByUserEmail(userEmail).subscribe(
        (businesses: BusinessDTO[]) => {
          if (businesses.length > 0) {
            this.businessInfo = businesses;
            const business = businesses[0];
            this.businessName = business.bizname;
            this.businessLocation = business.location;
            this.businessIndustry = business.industry;
            this.businessCreationDate = new Date(business.dateOfBizCreation).toLocaleDateString();
            this.businessLogo = business.businessLogo;
            this.contactEmail = userEmail;
            this.firstName = business.user.firstname;
            this.showUploadLogoForm = true;
            this.showCreateForm = false;
            this.showUpdateForm = false; // Show update form
            this.createdBusinessId = business.id;
            this.updateBusinessForm.patchValue({
              bizname: business.bizname,
              location: business.location,
              industry: business.industry,
              dateOfBizCreation: business.dateOfBizCreation
            });

          } else {
            console.error('No businesses found for the user.');
          }

        },
        (error) => {
          console.error('Error fetching business information:', error);
        }
      );
    } else {
      console.error('User email not found.');
    }
  }

  onUploadLogo() {
    const logoControl = this.createBusinessForm.get('businessLogo');
    if (logoControl && logoControl.value) {
      this.uploadLogo(this.createdBusinessId, logoControl.value);
    } else {
      console.error('No logo file selected');
    }
  }

  uploadLogo(businessId: number, logoFile: File) {
    this.businessService.uploadBusinessLogo(businessId, logoFile).subscribe(
      () => {
        this.showUploadLogoForm = false;
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error('Error uploading logo:', error);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createBusinessForm.patchValue({
        businessLogo: file
      });
    }
  }

  // New method for handling the update form submission
  onUpdateSubmit() {
    if (this.updateBusinessForm.valid) {
      const updatedBusiness: BusinessDTO = {
        ...this.businessInfo[0],
        bizname: this.updateBusinessForm.value.bizname,
        location: this.updateBusinessForm.value.location,
        industry: this.updateBusinessForm.value.industry,
        dateOfBizCreation: this.updateBusinessForm.value.dateOfBizCreation
      };

      this.businessService.updateBusiness(this.createdBusinessId, updatedBusiness).subscribe(
        () => {
          console.log('Business updated successfully');
          this.fetchBusinessDetails(); // Reload business details after update
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating business:', error);
        }
      );
    }
  }

  // Method to show the upload logo form when update logo button is clicked
  onUpdateLogoClick() {
    this.showUploadLogoForm = true;
  }


  // Methods related to skills

  private loadSkills(businessId: number) {
    console.log("busiess id", businessId)
    this.expertiseService.getExpertisesByBusinessId(businessId).subscribe(
      (data: ExpertiseDTO[]) => {
        console.log("data skills", data)
        this.skills = data;
        if (this.skills.length === 0) {
          // Show create skill form if no skills exist
          this.showCreateSkillForm = true;
        }
      },
      (error) => {
        console.error('Error loading skills', error);
      }
    );
  }

  onCreateSkill() {
    if (this.createSkillForm.valid && this.createdBusinessId) {
      const newSkill: ExpertiseDTO = {
        ...this.createSkillForm.value,
        businessId: this.createdBusinessId
      };
      console.log("newsKill", newSkill);
      this.expertiseService.createExpertise(newSkill).subscribe(
        () => {
          // If skills are not already loaded, load them
          if (this.skills.length === 0) {
            this.loadSkills(this.createdBusinessId);
          }

          // Reset the form and hide it
          this.createSkillForm.reset();
          this.showCreateSkillForm = false;
        },
        (error) => {
          console.error('Error creating skill', error);
        }
      );
    }
  }


  onEditSkill(skill: ExpertiseDTO) {
    this.selectedSkill = skill;
    this.updateSkillForm.patchValue(skill);
    this.showUpdateSkillForm = true;
  }

  onUpdateSkill() {
    if (this.updateSkillForm.valid && this.selectedSkill) {
      const updatedSkill: ExpertiseDTO = { ...this.selectedSkill, ...this.updateSkillForm.value };
      this.expertiseService.updateExpertise(updatedSkill.id, updatedSkill).subscribe(
        (response) => {
          const index = this.skills.findIndex(skill => skill.id === response.id);
          if (index !== -1) {
            this.skills[index] = response;
          }
          this.showUpdateSkillForm = false;
          this.selectedSkill = null;
        },
        (error) => {
          console.error('Error updating skill', error);
        }
      );
    }
  }


  // reviewee

  getBusinessReviews(): void {
    if (this.createdBusinessId) {
      this.expertiseService.getAllExpertises().subscribe(
        data => {
          this.reviews = data.flatMap(expertise => expertise.reviews);
          console.log("reviews from expertise in get business reviews",this.reviews );

          this.reviews.forEach(review => {
            console.log("review.businessId from expertise in get business reviews ",review.businessId );

            if (review.reviewerBusinessId == this.createdBusinessId) {

              this.getReviewee(review.businessId);

            }
          });
        },
        error => console.error(error)
      );
    } else {
      console.error('Business ID is not set.');
    }
  }


  getReviewee(businessId: number): void {
    this.expertiseService.getReviewee(businessId).subscribe(
      (data) => {
        this.reviewees[businessId] = data;
        console.log("data from reviewee ",data );

      },
      (error) => console.error('Error fetching reviewee:', error)
    );
  }

}
