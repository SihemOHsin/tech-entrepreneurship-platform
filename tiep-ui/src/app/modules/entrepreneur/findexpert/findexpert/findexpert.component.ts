import {Component, OnInit} from '@angular/core';
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {ExpertiseDTO, Review} from "../../../../services/expertise/expertise-dto.model";
import {BusinessService} from "../../../../services/business/business.service";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";
import {GetUserByEmail$Params} from "../../../../services/fn/authentication/get-user-by-email";
import {User} from "../../../../services/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenService} from "../../../../services/token/token.service";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {ReviewService} from "../../../../services/review/review.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-findexpert',
  templateUrl: './findexpert.component.html',
  styleUrls: ['./findexpert.component.scss']
})
export class FindexpertComponent implements OnInit {

  businesses: BusinessDTO[] = [];
  businessExpertises: { [key: number]: ExpertiseDTO[] } = {}; // Map to store expertise associated with each business
  businessRatings: { [key: number]: number } = {}; // Map to store ratings associated with each business

  reviewForm: FormGroup;
  selectedBusinessId: number ;
  reviewerBusinessId: number | null = null;
  submittedRating: number | null = null; // Variable to store the submitted rating
  averageRating: number | null = null; // Variable to store the average rating
  Reviews: Review[] = [];

  constructor(
    private businessService: BusinessService,
    private expertiseService: ExpertiseService,
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadBusinesses();
    this.getProfile();
    this.initReviewForm();
  }

  loadBusinesses() {
    this.businessService.getBusinessesByUserRole('itexpert').subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
        this.fetchExpertisesForBusinesses();
        this.fetchBusinessRatings();
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
          this.businessExpertises[business.id] = data || [];
        },
        (error) => {
          console.error(`Error fetching expertises for business ${business.id}:`, error);
        }
      );
    });
  }

  fetchBusinessRatings() {
    this.businesses.forEach(business => {
      this.reviewService.getAllReviews(business.id).subscribe(
        (reviews: Review[]) => {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = reviews.length ? totalRating / reviews.length : 0;
          this.businessRatings[business.id] = averageRating;
        },
        (error) => {
          console.error(`Error fetching reviews for business ${business.id}:`, error);
        }
      );
    });
  }

  getExpertiseList(businessId: number): string {
    return this.businessExpertises[businessId]?.map(e => e.description).join(', ') || 'No expertise available';
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
                    this.businesses = businesses;
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
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
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
    if (this.selectedBusinessId !== null) {
      const review: Review = {
        ...this.reviewForm.value,
        description: "Entrepreneur rating expert",
        title: "Experts rates",
        reviewerBusinessId: this.reviewerBusinessId,
      };
      console.log("Review to be submitted FORM:", this.reviewForm.value);
      console.log("Review object to be submitted:", review);

      this.reviewService.addReview(this.selectedBusinessId, review).subscribe(
        (response) => {
          console.log('Review submitted successfully:', response);
          this.updateBusinessRating(this.selectedBusinessId);
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

  updateBusinessRating(businessId: number) {
    this.reviewService.getAllReviews(businessId).subscribe(
      (reviews: Review[]) => {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviews.length ? totalRating / reviews.length : 0;
        this.businessRatings[businessId] = averageRating;
      },
      (error) => {
        console.error(`Error updating reviews for business ${businessId}:`, error);
      }
    );
  }
}
