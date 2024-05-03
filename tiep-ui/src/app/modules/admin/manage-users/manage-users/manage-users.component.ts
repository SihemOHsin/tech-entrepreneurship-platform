import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  users: any[] = [
    { firstName: 'sTE VirtuA', lastName: 'Startup', email: 'virtua@gmail.com', authority: 'Admin' },
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', authority: 'User' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', authority: 'User' },
    { firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com', authority: 'Admin' },
    { firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@example.com', authority: 'User' },
    { firstName: 'David', lastName: 'Martinez', email: 'david.martinez@example.com', authority: 'Admin' },
    { firstName: 'Sophia', lastName: 'Lee', email: 'sophia.lee@example.com', authority: 'User' },
    { firstName: 'Matthew', lastName: 'Garcia', email: 'matthew.garcia@example.com', authority: 'User' },
    { firstName: 'Olivia', lastName: 'Wilson', email: 'olivia.wilson@example.com', authority: 'Admin' },
    { firstName: 'William', lastName: 'Anderson', email: 'william.anderson@example.com', authority: 'User' },
    { firstName: 'Isabella', lastName: 'Taylor', email: 'isabella.taylor@example.com', authority: 'User' },
  ];

  // Pagination variables
  pageSize: number = 4; // Number of users per page
  currentPage: number = 1; // Current page
  totalPages: number = Math.ceil(this.users.length / this.pageSize); // Total number of pages
  pages: number[] = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Array of page numbers
  paginatedUsers: any[] = []; // Array to hold users for current page

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

    // Calculate start and end index of users for current page
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.users.length - 1);

    // Extract users for current page
    this.paginatedUsers = this.users.slice(startIndex, endIndex + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
}
