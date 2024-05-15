import {Component, OnInit} from '@angular/core';
import {ConsultationDTOs} from "../../../../services/consultation/consulaltion.model";
import {ConsultationService} from "../../../../services/consultation/consultation.service";

@Component({
  selector: 'app-manage-consultations',
  templateUrl: './manage-consultations.component.html',
  styleUrls: ['./manage-consultations.component.scss']
})
export class ManageConsultationsComponent implements OnInit{
  consultations: ConsultationDTOs[];
  consultation: ConsultationDTOs;
  consultationId: number;

  constructor( private consultationService: ConsultationService ) {
  }

  ngOnInit(): void {
    this.getAllConsultations();
    this.viewConsultation(this.consultationId);
  }

  getAllConsultations(): void {
    this.consultationService.findAll()
      .subscribe((data: ConsultationDTOs[]) => {
        this.consultations = data;
      });
  }


  viewConsultation(consultationId: number) {
    this.consultationService.getConsultationById(consultationId)
      .subscribe((data: ConsultationDTOs) => {
        this.consultation = data;
      });
    console.log('View consultation with id:', consultationId);
  }

  protected readonly Math = Math;

  performAction(consultation: any) {

  }
}
