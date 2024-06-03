import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../../services/order/order.service";
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {OrderDTO} from "../../../../services/order/order.model";

@Component({
  selector: 'app-view-consultation',
  templateUrl: './view-consultation.component.html',
  styleUrls: ['./view-consultation.component.scss']
})
export class ViewConsultationComponent implements OnInit{
  orders: OrderDTO[] = [];
  searchQuery: string = '';

  constructor(private orderService: OrderService) { }

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

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders() {
    this.orderService.findAllOrders().subscribe(
      (data: OrderDTO[]) => {
        this.orders = data;
        console.log('data from oredrs', data)
      },
      (error) => {
        console.log('Error fetching businesses:', error);
      }
    );
  }
}
