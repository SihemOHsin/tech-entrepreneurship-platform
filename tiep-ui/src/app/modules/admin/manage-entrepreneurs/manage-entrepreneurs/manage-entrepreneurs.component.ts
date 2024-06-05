import {Component, OnInit} from '@angular/core';
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {BusinessService} from "../../../../services/business/business.service";

@Component({
  selector: 'app-manage-entrepreneurs',
  templateUrl: './manage-entrepreneurs.component.html',
  styleUrls: ['./manage-entrepreneurs.component.scss']
})
export class ManageEntrepreneursComponent implements OnInit {

  businesses: BusinessDTO[];

  // Pagination variables
  pageSize: number = 8; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number; // Total number of pages
  pages: number[]; // Array of page numbers
  paginatedItems: BusinessDTO[] = []; // Array to hold items for current page

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses() {
    this.businessService.getBusinessesByUserRole('entrepreneur').subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
        this.calculatePagination();
      },
      (error) => {
        console.log('Error fetching businesses:', error);
      }
    );
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.businesses.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.businesses.length - 1);

    // Extract items for current page
    this.paginatedItems = this.businesses.slice(startIndex, endIndex + 1);
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }
}
