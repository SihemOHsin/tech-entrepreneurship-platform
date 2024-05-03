import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultationsComponent } from './manage-consultations.component';

describe('ManageConsultationsComponent', () => {
  let component: ManageConsultationsComponent;
  let fixture: ComponentFixture<ManageConsultationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageConsultationsComponent]
    });
    fixture = TestBed.createComponent(ManageConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
