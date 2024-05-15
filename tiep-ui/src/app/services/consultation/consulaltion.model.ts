export interface ConsultationDTOs {
  id: number;
  consultationName: string;
  consultationDescription: string;
  price: number;
  business: {
    id: number;
    userId: number;
    bizname: string;
    dateOfBizCreation: string;
    industry: string;
    location: string;
  };
}
