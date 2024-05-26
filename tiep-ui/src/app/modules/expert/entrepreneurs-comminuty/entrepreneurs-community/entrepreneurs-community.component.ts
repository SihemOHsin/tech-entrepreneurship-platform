import {Component, OnInit} from '@angular/core';
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {ExpertiseDTO, Review} from "../../../../services/expertise/expertise-dto.model";
import {BusinessService} from "../../../../services/business/business.service";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../../../services/review/review.service";
import {GetUserByEmail$Params} from "../../../../services/fn/authentication/get-user-by-email";
import {User} from "../../../../services/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenService} from "../../../../services/token/token.service";
import {AuthenticationService} from "../../../../services/services/authentication.service";

@Component({
  selector: 'app-entrepreneurs-community',
  templateUrl: './entrepreneurs-community.component.html',
  styleUrls: ['./entrepreneurs-community.component.scss']
})
export class EntrepreneursCommunityComponent implements OnInit{
  businessInfo: BusinessDTO[];

  searchQuery: string = '';
  filteredEntries: { id: number, title: string, content: string, fullContent: string, date: string, comments: number }[] = [];

  businesses: BusinessDTO[] = [];
  businessExpertises: { [key: number]: ExpertiseDTO[] } = {};
  blogEntries: { id: number, title: string, content: string, fullContent: string, date: string, comments: number }[] = [];

  currentPage = 1;
  entriesPerPage = 4;
  currentEntries: { id: number, title: string, content: string, fullContent: string, date: string, comments: number }[] = [];
  totalPages = 0;

  reviewForm: FormGroup;
  selectedBusinessId: number | null = null;
  reviewerBusinessId: number | null = null;

  constructor(
    private businessService: BusinessService,
    private tokenService: TokenService,
    private expertiseService: ExpertiseService,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.loadBusinesses();
    this.initReviewForm();
  }

  getProfile(): void {
    const tokenExists = !!this.tokenService.token;
    if (tokenExists) {
      const userEmail = this.tokenService.getUserEmailFromToken();
      if (userEmail) {
        const params: GetUserByEmail$Params = { email: userEmail };
        this.authenticationService.getUserByEmail(params).subscribe(
          (response: any) => {
            this.parseBlobToJson(response).then((user: User) => {
              if (user && user.id) {
                this.businessService.getBusinessesByUserEmail(userEmail).subscribe(
                  (businesses: BusinessDTO[]) => {
                    this.businessInfo = businesses;
                    if (businesses.length > 0) {
                      const business = businesses[0];

                      this.reviewerBusinessId = business.id;
                      console.log("reviewerBusinessId:", this.reviewerBusinessId);


                    } else {
                      console.error('No businesses found for the user.');
                    }
                    console.log('business info:', businesses);
                  },
                  (error) => {
                    console.error('Error fetching business information:', error);
                  }
                );
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
    } else {
      console.error('Token not found. User not authenticated.');
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



  initReviewForm() {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  loadBusinesses() {
    this.businessService.getBusinessesByUserRole('entrepreneur').subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
        this.fetchExpertisesForBusinesses();
      },
      (error) => {
        console.log('Error fetching businesses:', error);
      }
    );
  }

  fetchExpertisesForBusinesses() {
    this.businesses.forEach(business => {
      this.expertiseService.getExpertisesByBusinessId(business.id).subscribe(
        (data: ExpertiseDTO[]) => {
          this.businessExpertises[business.id] = data;
          this.populateBlogEntries();
        },
        (error) => {
          console.error(`Error fetching expertises for business ${business.id}:`, error);
        }
      );
    });
  }

  populateBlogEntries() {
    this.blogEntries = [];
    this.businesses.forEach(business => {
      const expertises = this.businessExpertises[business.id];
      if (expertises && expertises.length > 0) {
        expertises.forEach(expertise => {
          this.blogEntries.push({
            id: expertise.business.id,
            title: expertise.business.bizname,
            content: expertise.description.slice(0, 100) + '...',
            fullContent: expertise.description,
            date: expertise.business.dateOfBizCreation,
            comments: (expertise.reviews.length)
          });
        });
      }
    });

    if (this.searchQuery) {
      this.blogEntries = this.blogEntries.filter(entry =>
        entry.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.updateBlogEntries();
  }

  updateBlogEntries() {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    this.currentEntries = this.blogEntries.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.blogEntries.length / this.entriesPerPage);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updateBlogEntries();
  }

  showFullContent(id: number) {
    const partialContentId = 'partialContent' + id;
    const fullContentId = 'fullContent' + id;
    const partialContent = document.getElementById(partialContentId);
    const fullContent = document.getElementById(fullContentId);

    if (partialContent && fullContent) {
      partialContent.style.display = 'none';
      fullContent.style.display = 'block';
    }
  }

  onSearch() {
    const searchTerm = this.searchQuery.trim().toLowerCase();
    if (searchTerm) {
      this.filteredEntries = this.blogEntries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredEntries = this.blogEntries;
    }
  }

  openReviewModal(businessId: number) {
    this.selectedBusinessId = businessId;
    console.log("this.selectedBusinessId:", this.selectedBusinessId);

    this.reviewForm.reset();
    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) {
      reviewModal.style.display = 'block';
    }
    console.log("Review Modal opened for Business ID:", businessId);
  }

  closeReviewModal() {
    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) {
      reviewModal.style.display = 'none';
    }
  }

  submitReview() {
    //  id?: number; // Making id property optional
    //   title: string;
    //   description: string;
    //   rating: number;
    //   businessId: number;//reviewer
    //   reviewerBusinessId?: number;


    if (this.selectedBusinessId !== null ) {
      const review: Review = {
        ...this.reviewForm.value,
        reviewerBusinessId: this.reviewerBusinessId,
      };
      console.log("Review to be submitted FORM:", this.reviewForm.value);

      console.log("Review object to be submitted:", review);

      this.reviewService.addReview(this.selectedBusinessId, review).subscribe(
        (response) => {
          console.log('Review submitted successfully:', response);
          this.closeReviewModal();
        },
        (error) => {
          console.error('Error submitting review:', error);
        }
      );
    } else {
      console.log("Review form is invalid or IDs are not set");
    }
  }
}
