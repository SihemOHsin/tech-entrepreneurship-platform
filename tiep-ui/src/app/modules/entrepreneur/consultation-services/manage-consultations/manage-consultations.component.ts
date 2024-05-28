import {Component, OnInit} from '@angular/core';
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";
import {ConsultationService} from "../../../../services/consultation/consultation.service";

@Component({
  selector: 'app-manage-consultations',
  templateUrl: './manage-consultations.component.html',
  styleUrls: ['./manage-consultations.component.scss']
})
export class ManageConsultationsComponent implements OnInit {
  consultations: ConsultationDTOs[] = [];
  consultation: ConsultationDTOs | undefined;

  constructor(private consultationService: ConsultationService) { }

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
}
