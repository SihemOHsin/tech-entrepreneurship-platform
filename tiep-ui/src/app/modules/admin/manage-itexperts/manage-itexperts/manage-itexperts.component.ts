import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-itexperts',
  templateUrl: './manage-itexperts.component.html',
  styleUrls: ['./manage-itexperts.component.scss']
})
export class ManageItexpertsComponent {
  items: any[] = [
    { userfirstname: 'Sihem', userlastname: 'Expert IT - Sihem Hsin', bizname: 'VirtuA Agency', dateOfBizCreation: '2020-01-06', industry: 'DIGITAL MARKETING', location: 'Sfax' },
    { userfirstname: 'John', userlastname: 'Doe', bizname: 'Doe Corporation', dateOfBizCreation: '2019-05-15', industry: 'SOFTWARE DEVELOPMENT', location: 'New York' },
    { userfirstname: 'Jane', userlastname: 'Smith', bizname: 'Smith Enterprises', dateOfBizCreation: '2018-10-22', industry: 'WEB DESIGN', location: 'Los Angeles' },
    { userfirstname: 'Michael', userlastname: 'Johnson', bizname: 'Johnson Solutions', dateOfBizCreation: '2021-03-10', industry: 'CYBERSECURITY', location: 'Chicago' },
    { userfirstname: 'Emily', userlastname: 'Brown', bizname: 'Brown Technologies', dateOfBizCreation: '2020-07-01', industry: 'AI & MACHINE LEARNING', location: 'San Francisco' },
    { userfirstname: 'David', userlastname: 'Martinez', bizname: 'Martinez Innovations', dateOfBizCreation: '2017-12-05', industry: 'DATA ANALYTICS', location: 'Houston' },
    { userfirstname: 'Sophia', userlastname: 'Lee', bizname: 'Lee Solutions', dateOfBizCreation: '2019-09-18', industry: 'CLOUD COMPUTING', location: 'Dallas' },
    { userfirstname: 'Matthew', userlastname: 'Garcia', bizname: 'Garcia Enterprises', dateOfBizCreation: '2018-04-30', industry: 'E-COMMERCE', location: 'Miami' },
    { userfirstname: 'Olivia', userlastname: 'Wilson', bizname: 'Wilson Tech', dateOfBizCreation: '2022-02-20', industry: 'SOFTWARE TESTING', location: 'Seattle' },
    { userfirstname: 'William', userlastname: 'Anderson', bizname: 'Anderson Systems', dateOfBizCreation: '2016-11-12', industry: 'IT CONSULTING', location: 'Boston' },
  ];
  // Pagination variables
  pageSize: number = 4; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = Math.ceil(this.items.length / this.pageSize); // Total number of pages
  pages: number[] = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Array of page numbers
  paginatedItems: any[] = []; // Array to hold items for current page

  constructor() {
    this.setPage(1); // Set initial page
  }

  setPage(page: number) {
    // Validate page number
    if (page < 1 || page > this.totalPages) {
      return;
    }

    // Update current page
    this.currentPage = page;

    // Calculate start and end index of items for current page
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.items.length - 1);

    // Extract items for current page
    this.paginatedItems = this.items.slice(startIndex, endIndex + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
}
