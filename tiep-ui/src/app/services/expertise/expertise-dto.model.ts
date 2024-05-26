// expertise-dto.model.ts
export class ExpertiseDTO {
  id: number;
  title: string;
  description: string;
  minProposedPrice: string;
  maxProposedPrice: string;
  business: Business;
  reviews: Review[];
}

export class Business {
  id: number;
  userId: number;
  bizname: string;
  dateOfBizCreation: string; // Assuming ISO-8601 format
  industry: string;
  location: string;
  businessLogo?: string;

}

export class Review {
  id?: number; // Making id property optional
  title: string;
  description: string;
  rating: number;
  businessId: number;//reviewer
  reviewerBusinessId?: number;
}
