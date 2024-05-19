import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../../services/review/review.service";
import {Review} from "../../../../services/expertise/expertise-dto.model";
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {BusinessService} from "../../../../services/business/business.service";
import {TokenService} from "../../../../services/token/token.service";

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

  reviews: Review[] = [];
  businessId: number = 1; // Example business ID
  newReview: Review = {
    title: '',
    description: '',
    rating: 0,
    businessId: this.businessId
  };
  selectedReview: Review | null = null;

  constructor(private reviewService: ReviewService, private businessService: BusinessService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getReviews();
    this.getProfile();
  }

  getReviews(): void {
    this.reviewService.getAllReviews(this.businessId).subscribe(
      data => this.reviews = data,
      error => console.error(error)
    );
  }

  addReview(): void {
    this.reviewService.addReview(this.businessId, this.newReview).subscribe(
      response => {
        console.log(response);
        this.getReviews(); // Refresh the review list
        this.resetNewReview();
      },
      error => console.error(error)
    );
  }

  selectReview(review: Review): void {
    this.selectedReview = { ...review };
  }

  updateReview(): void {
    if (this.selectedReview && this.selectedReview.id) {
      this.reviewService.updateReview(this.selectedReview.id, this.selectedReview).subscribe(
        response => {
          console.log(response);
          this.getReviews(); // Refresh the review list
          this.selectedReview = null;
        },
        error => console.error(error)
      );
    }
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(
      response => {
        console.log(response);
        this.getReviews(); // Refresh the review list
      },
      error => console.error(error)
    );
  }

  resetNewReview(): void {
    this.newReview = {
      title: '',
      description: '',
      rating: 0,
      businessId: this.businessId
    };
  }

   getProfile() {
    const tokenExists = !!this.tokenService.token; // Check if token exists
    if (tokenExists) {
      const userEmail = this.tokenService.getUserEmailFromToken();
      if (userEmail) {
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
              this.firstName = business.user.firstname;  // Extracting the first name
            }
            console.log("business info:", businesses); // Log business info
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
}
