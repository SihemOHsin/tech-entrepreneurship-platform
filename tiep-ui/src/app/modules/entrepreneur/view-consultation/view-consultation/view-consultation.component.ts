import { Component } from '@angular/core';

@Component({
  selector: 'app-view-consultation',
  templateUrl: './view-consultation.component.html',
  styleUrls: ['./view-consultation.component.scss']
})
export class ViewConsultationComponent {
  // Static data for demonstration
  dataSource = [
    { name: 'John Doe', email: 'john@example.com', contactNumber: '1234567890', paymentMethod: 'Credit Card', total: 100 },
    { name: 'Jane Smith', email: 'jane@example.com', contactNumber: '0987654321', paymentMethod: 'PayPal', total: 150 },
    { name: 'Alice Johnson', email: 'alice@example.com', contactNumber: '4567890123', paymentMethod: 'Bank Transfer', total: 200 }
  ];
  searchQuery: string = '';

  constructor() { }

  applyFilter() {
    // Logic for filtering data
  }

  handleViewAction(element: any) {
    // Logic for handling view action
  }

  downloadReportAction(element: any) {
    // Logic for handling download action
  }

  handleDeleteAction(element: any) {
    // Logic for handling delete action
  }
}
