import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from "../../../../services/order/order.service";
import { BusinessService } from "../../../../services/business/business.service";
import { ConsultationService } from "../../../../services/consultation/consultation.service";
import { BusinessDTO } from "../../../../services/business/business-dto.model";
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  myForm: FormGroup;
  consultationServices: ConsultationDTOs[] = [];
  businesses: BusinessDTO[] = [];
  totalAmount: number = 0;
  selectedConsultation: ConsultationDTOs | undefined; // Updated to store the selected consultation object

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private businessService: BusinessService,
    private consultationService: ConsultationService
  ) {
    this.myForm = this.fb.group({
      consultationServices: ['', Validators.required],
      price: ['', Validators.required],
      selectedBusiness: ['', Validators.required],
      businessId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      total: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses() {
    this.businessService.getAllBusinesses().subscribe(
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
    this.myForm.get('businessId')?.setValue(selectedBusinessId); // Safely set the selected business ID to the form control
    if (selectedBusinessId) {
      this.consultationService.findConsultationByBusinessId(selectedBusinessId).subscribe(
        (data: ConsultationDTOs[]) => {
          this.consultationServices = data;
        },
        (error) => {
          console.error('Error fetching consultations:', error);
        }
      );
    } else {
      this.consultationServices = []; // Clear consultations if no business is selected
    }
  }

  updateConsultationPrice(event: any) {
    const selectedConsultationId = +event.target.value; // Convert to number
    this.selectedConsultation = this.consultationServices.find(consultation => consultation.id === selectedConsultationId); // Store the selected consultation object

    const consultationPrice = this.selectedConsultation?.price;

    console.log('Selected consultation price:', consultationPrice);

    if (consultationPrice !== undefined) {
      this.myForm.get('price')?.setValue(consultationPrice);

      const vat = 0.19; // 19% VAT
      this.totalAmount = consultationPrice + (consultationPrice * vat);

      console.log("totalAmounttotalAmount ", this.totalAmount)
      this.myForm.get('total')?.setValue(this.totalAmount);
    }
  }

  submitAction() {
    if (this.myForm.valid && this.selectedConsultation) { // Check if the form is valid and a consultation is selected
      // Extract form values
      const formData = this.myForm.value;

      // Include the selected consultation object in the form data
      formData.consultationServices = this.selectedConsultation;
      console.log('new form data ', formData)

      // Send HTTP request to save order
      this.orderService.saveOrder(formData).subscribe(
        (savedOrder) => {
          // Handle successful order saving
          console.log('Order saved successfully:', savedOrder);

          // Generate PDF report
          const reportRequest = {
            orderId: savedOrder.id // Assuming savedOrder contains the id of the newly saved order
          };
          this.orderService.generateReport(reportRequest).subscribe(
            (reportUrl) => {
              // Handle successful report generation
              console.log('PDF report generated successfully:', reportUrl);

              // Now you have the URL of the generated report, you can redirect the user or display the link to download the report
            },
            (reportError) => {
              // Handle report generation error
              console.error('Error generating PDF report:', reportError);
            }
          );
        },
        (saveError) => {
          // Handle save order error
          console.error('Error saving order:', saveError);
        }
      );
    } else {
      // Form is invalid or no consultation is selected, display error message or handle it accordingly
      console.error('Form is invalid or no consultation is selected. Cannot submit.');
    }
  }

  add() {
    // Functionality for adding action
    console.log('Add action triggered');
  }

  handleDeleteAction() {
    // Functionality for handling delete action
    console.log('Delete action triggered for index:');
  }

  validateProductAdd(): boolean {
    // Functionality for validating product add
    return false; // For demonstration, always return false
  }
}
