import { Component } from '@angular/core';

@Component({
  selector: 'app-resourcehub',
  templateUrl: './resourcehub.component.html',
  styleUrls: ['./resourcehub.component.scss']
})
export class ResourcehubComponent {

  isAccordionOpen: { [key: string]: boolean } = {
    'Demo1': false,
    'Demo2': false,
    'Demo3': false,
    'Demo4': false,
    'Demo5': false
  };

  constructor() { }

  toggleAccordion(id: string) {
    this.isAccordionOpen[id] = !this.isAccordionOpen[id];
  }
}
