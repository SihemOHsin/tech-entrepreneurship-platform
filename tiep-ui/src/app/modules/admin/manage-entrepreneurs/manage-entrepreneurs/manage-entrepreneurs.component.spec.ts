import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEntrepreneursComponent } from './manage-entrepreneurs.component';

describe('ManageEntrepreneursComponent', () => {
  let component: ManageEntrepreneursComponent;
  let fixture: ComponentFixture<ManageEntrepreneursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEntrepreneursComponent]
    });
    fixture = TestBed.createComponent(ManageEntrepreneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
