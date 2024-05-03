import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItexpertsComponent } from './manage-itexperts.component';

describe('ManageItexpertsComponent', () => {
  let component: ManageItexpertsComponent;
  let fixture: ComponentFixture<ManageItexpertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageItexpertsComponent]
    });
    fixture = TestBed.createComponent(ManageItexpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
