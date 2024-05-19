import {Component, OnInit} from '@angular/core';
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {ExpertiseDTO} from "../../../../services/expertise/expertise-dto.model";
import {BusinessService} from "../../../../services/business/business.service";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";

@Component({
  selector: 'app-entrepreneurs-community',
  templateUrl: './entrepreneurs-community.component.html',
  styleUrls: ['./entrepreneurs-community.component.scss']
})
export class EntrepreneursCommunityComponent implements OnInit{

  searchQuery: string = '';
  filteredEntries: { id: number, title: string, content: string, fullContent: string,date:string, comments: number }[] = [];

  businesses: BusinessDTO[];
  businessExpertises: { [key: number]: ExpertiseDTO[] } = {};
  blogEntries: { id: number, title: string, content: string, fullContent: string,date:string, comments: number }[] = [];

  currentPage = 1;
  entriesPerPage = 4;
  currentEntries: { id: number, title: string, content: string, fullContent: string,date:string , comments: number }[] = [];
  totalPages = 0;

  constructor(
    private businessService: BusinessService,
    private expertiseService: ExpertiseService
  ) { }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses() {
    this.businessService.getBusinessesByUserRole('entrepreneur').subscribe(
      (data: BusinessDTO[]) => {
        this.businesses = data;
        this.fetchExpertisesForBusinesses();
      },
      (error) => {
        console.log('Error fetching businesses:', error);
      }
    );
  }

  fetchExpertisesForBusinesses() {
    this.businesses.forEach(business => {
      this.expertiseService.getExpertisesByBusinessId(business.id).subscribe(
        (data: ExpertiseDTO[]) => {
          this.businessExpertises[business.id] = data; // Store the expertise associated with the business
          this.populateBlogEntries(); // Populate blogEntries after fetching expertises
        },
        (error) => {
          console.error(`Error fetching expertises for business ${business.id}:`, error);
        }
      );
    });
  }

  populateBlogEntries() {
    this.blogEntries = [];
    this.businesses.forEach(business => {
      const expertises = this.businessExpertises[business.id];
      if (expertises && expertises.length > 0) {
        expertises.forEach(expertise => {
          this.blogEntries.push({
            id: expertise.business.id,
            title: expertise.business.bizname,
            content: expertise.description.slice(0, 100) + '...',
            fullContent: expertise.description,
            date: expertise.business.dateOfBizCreation,
            comments: (expertise.reviews.length)
          });
        });
      }
    });

    // Filter blogEntries based on search query
    if (this.searchQuery) {
      this.blogEntries = this.blogEntries.filter(entry =>
        entry.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.updateBlogEntries(); // Update currentEntries and totalPages
  }
//
  updateBlogEntries() {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    this.currentEntries = this.blogEntries.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.blogEntries.length / this.entriesPerPage);
  }

  changePage(delta: number) {
    this.currentPage += delta;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    //

    this.updateBlogEntries();
  }

  showFullContent(id: number) {
    const partialContentId = 'partialContent' + id;
    const fullContentId = 'fullContent' + id;
    const partialContent = document.getElementById(partialContentId);
    const fullContent = document.getElementById(fullContentId);

    if (partialContent && fullContent) {
      partialContent.style.display = 'none';
      fullContent.style.display = 'block';
    }
  }

  onSearch() {
    const searchTerm = this.searchQuery.trim().toLowerCase();
    if (searchTerm) {
      this.filteredEntries = this.blogEntries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm)
      );
    } else {
      // If the search query is empty, show all blog entries
      this.filteredEntries = this.blogEntries;
    }
  }


}
