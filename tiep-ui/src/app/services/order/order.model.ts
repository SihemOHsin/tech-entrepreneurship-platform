export interface Consultation {
  id: number;
  consultationName: string;
  consultationDescription: string;
  price: number;
  businessId: number;
}

export interface OrderDTO {
  id: string;
  consultationServices: Consultation[];
  businessId: number;
  paymentMethod: string;
  contactNumber: string;
  email: string;
  name: string;
  total: number;
}
