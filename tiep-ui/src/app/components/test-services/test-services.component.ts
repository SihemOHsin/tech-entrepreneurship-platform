import { Component } from '@angular/core';
import {BusinessDTO} from "../../services/business/business-dto.model";
import {BusinessService} from "../../services/business/business.service";

@Component({
  selector: 'app-test-services',
  templateUrl: './test-services.component.html',
  styleUrls: ['./test-services.component.scss']
})
export class TestServicesComponent {
  businesses: BusinessDTO[];

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    // Example usage of getAllBusinesses()
    this.businessService.getAllBusinesses().subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
        console.log(this.businesses); // You can handle the data here
      },
      error => {
        console.error('Error fetching businesses:', error);
      }
    );

    // You can call other methods of BusinessService in a similar way
  }

}
