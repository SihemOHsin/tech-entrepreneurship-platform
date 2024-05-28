import {Component, OnInit} from '@angular/core';
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";
import {ConsultationService} from "../../../../services/consultation/consultation.service";
import {Consultation} from "../../../../services/order/order.model";

@Component({
  selector: 'app-manage-consultations',
  templateUrl: './manage-consultations.component.html',
  styleUrls: ['./manage-consultations.component.scss']
})
export class ManageConsultationsComponent implements OnInit{
  consultations: ConsultationDTOs[] = [];
  consultation: ConsultationDTOs | undefined;
  newConsultation: Consultation | undefined;

  editing: boolean = false;

  constructor(private consultationService: ConsultationService) { }

  ngOnInit(): void {
    this.getAllConsultations();
  }

  getAllConsultations(): void {
    this.consultationService.findAll()
      .subscribe((data: ConsultationDTOs[]) => {
        this.consultations = data;
        console.log('Fetched consultations:', data);
      });
  }

  viewConsultation(consultation: ConsultationDTOs): void {
    this.consultation = { ...consultation };  // create a copy to avoid directly modifying the list item
    this.editing = true;
    console.log('View consultation:', consultation);
  }

  deleteConsultation(consultationId: number): void {
    this.consultationService.deleteConsultation(consultationId).subscribe(() => {
      this.getAllConsultations(); // Refresh the list after deletion
    });
    console.log('Deleted consultation with id:', consultationId);
  }

  updateConsultation(): void {
    console.log("consultation to be edited ", this.consultation );

    const updatedConsultation: Consultation = {
      id: this.consultation?.id ?? 0,
      consultationName: this.consultation?.consultationName?? '',
      consultationDescription: this.consultation?.consultationDescription?? '',
      price: this.consultation?.price?? 0,
      businessId: this.consultation?.business?.id ?? 0
    };

    if (this.consultation && this.consultation.business?.id) {
      this.consultationService.updateConsultation(updatedConsultation.id, updatedConsultation).subscribe(
        (updatedConsultation) => {
          console.log("consultation updated ", updatedConsultation );
          this.getAllConsultations(); // Refresh the list after update
          this.consultation = updatedConsultation; // Update the local consultation with the new data
          this.editing = false; // Exit editing mode
          console.log('Updated consultation with id:', this.consultation.id);
        },
        (error) => {
          console.error('Failed to update consultation:', error);
          // Handle error appropriately in the UI
        }
      );
    } else {
      console.error('Business ID cannot be null');
    }
  }



  cancelEdit(): void {
    this.consultation = undefined;
    this.editing = false;
  }

  getFirstHalfConsultations(): ConsultationDTOs[] {
    const mid = Math.ceil(this.consultations.length / 2);
    return this.consultations.slice(0, mid);
  }

  getSecondHalfConsultations(): ConsultationDTOs[] {
    const mid = Math.ceil(this.consultations.length / 2);
    return this.consultations.slice(mid);
  }
}
