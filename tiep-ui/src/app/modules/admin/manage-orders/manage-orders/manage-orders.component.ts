import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../../services/order/order.service";
import { BusinessService } from "../../../../services/business/business.service";
import { ConsultationService } from "../../../../services/consultation/consultation.service";
import { BusinessDTO } from "../../../../services/business/business-dto.model";
import {Consultation, OrderDTO} from "../../../../services/order/order.model";
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";
import {ActivatedRoute, Router} from "@angular/router";
//import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import {PdfService} from "../../../../services/order/pdf.service";

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

  selectedExpertId: number;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private businessService: BusinessService,
    private consultationService: ConsultationService,
    private pdfService: PdfService
  ) {
  }

  ngOnInit(): void {

    if (history.state && history.state.selectedExpertId) {
      this.selectedExpertId = history.state.selectedExpertId;
      console.log("selectedExpertId", this.selectedExpertId);
      this.orderDTO.businessId = this.selectedExpertId;
      this.loadBusinessesAndConsultations();
    } else {
      this.loadBusinesses();
    }
  }

  loadBusinessesAndConsultations() {
    this.businessService.getBusinessesByUserRole('itexpert').subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
        this.loadConsultations(this.selectedExpertId); // Load consultations for the selected expert
      },
      (error) => {
        console.error('Error fetching businesses:', error);
      }
    );
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
    this.loadConsultations(selectedBusinessId);
  }

  loadConsultations(businessId: number) {
    if (businessId) {
      this.consultationService.findConsultationByBusinessId(businessId).subscribe(
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

      // Set the businessId based on the selectedExpertId or the business selected in the component
      this.orderDTO.businessId = this.selectedExpertId || this.orderDTO.businessId;

      if (this.validateOrderDTO(this.orderDTO)) {
        console.log('All required attributes exist in orderDTO. Proceeding to save order...', this.orderDTO);

        this.orderService.saveOrder(this.orderDTO).subscribe(
          (savedOrder) => {
            console.log('Order saved successfully:', savedOrder);

            //this.generatePDF(savedOrder); // Generate PDF after saving the order
            this.pdfService.generateInvoice(savedOrder); // Generate PDF after saving the order

            this.resetForm();

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

