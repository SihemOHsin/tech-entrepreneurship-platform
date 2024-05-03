import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-consultations',
  templateUrl: './manage-consultations.component.html',
  styleUrls: ['./manage-consultations.component.scss']
})
export class ManageConsultationsComponent {
  consultations: any[] = [
    {id: 1, name: 'Consultation 1', businessName: 'Business 1'},
    {id: 2, name: 'Consultation 2', businessName: 'Business 2'},
    {id: 3, name: 'Consultation 3', businessName: 'Business 3'},
    // Add more consultations as needed
  ];

  constructor() {
  }

  viewConsultation(consultationId: number) {
    // Implement logic to view consultation by id
    console.log('View consultation with id:', consultationId);
  }

  protected readonly Math = Math;

  performAction(consultation: any) {
    
  }
}
