import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../../services/order/order.service";
import { BusinessService } from "../../../../services/business/business.service";
import { ConsultationService } from "../../../../services/consultation/consultation.service";
import { BusinessDTO } from "../../../../services/business/business-dto.model";
import {Consultation, OrderDTO} from "../../../../services/order/order.model";
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  orderDTO: OrderDTO = {
    id: '',
    consultationServices: [],
    businessId: 0,
    paymentMethod: '',
    contactNumber: '',
    email: '',
    name: '',
    total: 0
  };
  consultationServices: Consultation[] = [];
  businesses: BusinessDTO[] = [];
  totalAmount: number = 0;
  selectedConsultation: Consultation | undefined;

  constructor(
    private orderService: OrderService,
    private businessService: BusinessService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses() {
    this.businessService.getBusinessesByUserRole('itexpert').subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
      },
      (error) => {
        console.error('Error fetching businesses:', error);
      }
    );
  }

  onBusinessSelection(event: any) {
    const selectedBusinessId = +event.target.value;
    this.orderDTO.businessId = selectedBusinessId;
    if (selectedBusinessId) {
      this.consultationService.findConsultationByBusinessId(selectedBusinessId).subscribe(
        (data: ConsultationDTOs[]) => {
          this.consultationServices = data.map((dto) => ({
            id: dto.id,
            consultationName: dto.consultationName,
            consultationDescription: dto.consultationDescription,
            price: dto.price,
            businessId: dto.business.id
          }));
        },
        (error) => {
          console.error('Error fetching consultations:', error);
        }
      );
    } else {
      this.consultationServices = [];
    }
  }

  updateConsultationPrice(event: any) {
    const selectedConsultationId = +event.target.value;
    this.selectedConsultation = this.consultationServices.find(consultation => consultation.id === selectedConsultationId);

    if (!this.selectedConsultation) {
      console.error('No consultation selected. Cannot proceed.');
      return;
    }

    const consultationPrice = this.selectedConsultation.price;
    if (consultationPrice !== undefined) {
      const vat = 0.19;
      this.totalAmount = consultationPrice + (consultationPrice * vat);
      const amountInput = document.getElementById('amount') as HTMLInputElement;
      if (amountInput) {
        amountInput.value = this.totalAmount.toString();
      }
    }
  }

  submitAction() {
    if (this.selectedConsultation) {
      this.orderDTO.consultationServices = [this.selectedConsultation];
      this.orderDTO.total = this.totalAmount;

      if (this.validateOrderDTO(this.orderDTO)) {
        console.log('All required attributes exist in orderDTO. Proceeding to save order...', this.orderDTO);

        this.orderService.saveOrder(this.orderDTO).subscribe(
          (savedOrder) => {
            console.log('Order saved successfully:', savedOrder);

            const reportRequest = {
              orderId: savedOrder.id
            };

            this.orderService.generateReport(this.orderDTO).subscribe(
              (reportResponse) => {
                // Assuming reportResponse is a string URL
                const reportUrl = reportResponse.replace(/\\/g, '/');
                console.log('Report generated successfully:', reportResponse);

                const pdfRequest = {
                  orderId: savedOrder.id
                };

                this.orderService.generatePdf(this.orderDTO).subscribe(
                  (blob) => {
                    console.log('PDF generated successfully');
                    const url = window.URL.createObjectURL(blob);
                    window.open(url);

                    // Refresh order list or other actions after successful operations
                    this.resetForm();
                  },
                  (pdfError) => {
                    console.error('Error generating PDF:', pdfError);
                  }
                );
              },
              (reportError) => {
                console.error('Error generating report:', reportError);
              }
            );
          },
          (saveError) => {
            console.error('Error saving order:', saveError);
          }
        );
      } else {
        console.error('Incomplete order data. Cannot submit.');
      }
    } else {
      console.error('No consultation selected. Cannot submit.');
    }
  }

  validateOrderDTO(orderDTO: OrderDTO): boolean {
    return !!(
      orderDTO.name &&
      orderDTO.email &&
      orderDTO.contactNumber &&
      orderDTO.paymentMethod &&
      orderDTO.businessId &&
      orderDTO.total !== undefined &&
      orderDTO.consultationServices &&
      orderDTO.consultationServices.length > 0 &&
      orderDTO.consultationServices.every(service =>
        service.id &&
        service.consultationName &&
        service.consultationDescription &&
        service.price !== undefined &&
        service.businessId
      )
    );
  }

  resetForm() {
    this.orderDTO = {
      id: '',
      consultationServices: [],
      businessId: 0,
      paymentMethod: '',
      contactNumber: '',
      email: '',
      name: '',
      total: 0
    };
    this.totalAmount = 0;
    this.selectedConsultation = undefined;
  }

  add() {
    console.log('Add action triggered');
  }

  handleDeleteAction() {
    console.log('Delete action triggered for index:');
  }

  validateProductAdd(): boolean {
    return false;
  }
}
