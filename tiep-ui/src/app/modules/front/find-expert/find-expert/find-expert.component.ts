import {Component, OnInit} from '@angular/core';
import {BusinessService} from "../../../../services/business/business.service";
import {BusinessDTO} from "../../../../services/business/business-dto.model";
import {ExpertiseService} from "../../../../services/expertise/expertise.service";
import {ExpertiseDTO} from "../../../../services/expertise/expertise-dto.model";

@Component({
  selector: 'app-find-expert',
  templateUrl: './find-expert.component.html',
  styleUrls: ['./find-expert.component.scss']
})
export class FindExpertComponent implements OnInit {

  businesses: BusinessDTO[];
  businessExpertises: { [key: number]: ExpertiseDTO[] } = {}; // Map to store expertise associated with each business

  constructor(
    private businessService: BusinessService,
    private expertiseService: ExpertiseService
  ) { }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses() {
    this.businessService.getBusinessesByUserRole('itexpert').subscribe(
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
          this.businessExpertises[business.id] = data || [];

        },
        (error) => {
          console.error(`Error fetching expertises for business ${business.id}:`, error);
        }
      );
    });
  }
}
