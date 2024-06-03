import {Component, OnInit} from '@angular/core';
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";
import {ConsultationService} from "../../../../services/consultation/consultation.service";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";
import {ExpertiseDTO} from "../../../../services/expertise/expertise-dto.model";

@Component({
  selector: 'app-manage-consultations',
  templateUrl: './manage-consultations.component.html',
  styleUrls: ['./manage-consultations.component.scss']
})
export class ManageConsultationsComponent implements OnInit {
  consultations: ConsultationDTOs[] = [];
  consultation: ConsultationDTOs | undefined;
  expertises: ExpertiseDTO[] = [];

  constructor(private consultationService: ConsultationService,
              private expertiseService: ExpertiseService
  ) { }

  ngOnInit(): void {
    this.getAllConsultations();
  }

  getAllConsultations(): void {
    this.consultationService.findAll()
      .subscribe((data: ConsultationDTOs[]) => {
        this.consultations = data;
        console.log('View consultation all data:', data);
      });
  }

  viewConsultation(consultation: ConsultationDTOs): void {
    this.consultation = consultation;
    console.log('View consultation with id:', this.consultation);
  }

  performAction(consultation: ConsultationDTOs): void {
    this.viewConsultation(consultation);
  }

  getFirstHalfConsultations(): ConsultationDTOs[] {
    const mid = Math.ceil(this.consultations.length / 2);
    return this.consultations.slice(0, mid);
  }

  getSecondHalfConsultations(): ConsultationDTOs[] {
    const mid = Math.ceil(this.consultations.length / 2);
    return this.consultations.slice(mid);
  }

  createConsultationFromExpertise(expertises: any) {

    const consultationData = {
      consultationName: expertises.title,
      consultationDescription: expertises.description,
      price: expertises.maxProposedPrice,
      businessId: expertises.businessId
    };

    this.consultationService.createConsultation(consultationData).subscribe(
      (response) => {
        console.log('Consultation created successfully:', response);
      },
      (error) => {
        console.error('Error creating consultation:', error);
      }
    );

  }
}
