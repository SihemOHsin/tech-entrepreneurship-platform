import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../../services/review/review.service";
import {Business, Review} from "../../../../services/expertise/expertise-dto.model";
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {BusinessService} from "../../../../services/business/business.service";
import {TokenService} from "../../../../services/token/token.service";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../services/models/user";
import {GetUserByEmail$Params} from "../../../../services/fn/authentication/get-user-by-email";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.scss']
})
export class ManageReviewsComponent implements OnInit {
  businessInfo: BusinessDTO[];
  businessName: string;
  businessLocation: string;
  businessIndustry: string;
  businessCreationDate: string;
  businessLogo: string;
  contactEmail: string;
  firstName: string;

  businessId: number;

  searchQuery: string = '';
  filteredReviews: any[] = [];
  reviews: any[] = [];
  reviewees: { [key: string]: any } = {};
  displayedReviews: any[] = [];
  selectedReview: Review | null = null;
  updatedReviewForm: FormGroup;

  constructor(
    private reviewService: ReviewService,
    private businessService: BusinessService,
    private tokenService: TokenService,
    private expertiseService: ExpertiseService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.updatedReviewForm = this.fb.group({
      description: ['']
    });
  }

  ngOnInit(): void {
    this.getProfile();

    this.displayedReviews = this.reviews;
  }

  filterReviews() {
    if (this.searchQuery) {
      this.displayedReviews = this.reviews.filter(review =>
        this.reviewees[review.businessId]?.bizname.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.displayedReviews = this.reviews;
    }
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
                      this.businessName = business.bizname;
                      this.businessLocation = business.location;
                      this.businessIndustry = business.industry;
                      this.businessCreationDate = new Date(business.dateOfBizCreation).toLocaleDateString();
                      this.businessLogo = business.businessLogo;
                      this.contactEmail = userEmail;
                      this.firstName = business.user.firstname;
                      this.businessId = business.id;
                      this.getBusinessReviews(); // Fetch reviews after setting businessId
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

  getBusinessReviews(): void {
    if (this.businessId) {
      this.expertiseService.getAllExpertises().subscribe(
        data => {
          this.reviews = data.flatMap(expertise => expertise.reviews);
          console.log("reviews from expertise in get business reviews",this.reviews );

          this.reviews.forEach(review => {
            console.log("review.businessId from expertise in get business reviews ",review.businessId );

            if (review.reviewerBusinessId == this.businessId) {

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

  editReview(review: Review): void {
    this.selectedReview = { ...review }; // Create a copy of the review to edit
    this.updatedReviewForm.patchValue({
      description: review.description
    });
  }

  // Method to update a review
  updateReview(reviewId: number): void {
    const updatedReview: Review = {
      ...this.updatedReviewForm.value,
      title: this.reviews.find(r => r.id === reviewId)?.title || '',
      rating: this.reviews.find(r => r.id === reviewId)?.rating || 0,
      businessId: this.reviews.find(r => r.id === reviewId)?.businessId || 0,
      reviewerBusinessId: this.businessId,
    };

    this.reviewService.updateReview(reviewId, updatedReview).subscribe(
      (response) => {
        console.log('Review updated successfully:', response);
        // Update the review in the displayed reviews list
        const index = this.displayedReviews.findIndex(review => review.id === reviewId);
        if (index !== -1) {
          this.displayedReviews[index] = response;
        }
        this.selectedReview = null; // Close the edit modal
      },
      (error) => {
        console.error('Error updating review:', error);
      }
    );
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(
      (response) => {
        console.log('Review deleted successfully:', response);
        this.getBusinessReviews();
      },
      (error) => {
        console.error('Error deleting review:', error);
      }
    );
  }
}
