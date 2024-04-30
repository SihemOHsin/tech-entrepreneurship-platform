import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurDashboardComponent } from './entrepreneur-dashboard.component';

describe('EntrepreneurDashboardComponent', () => {
  let component: EntrepreneurDashboardComponent;
  let fixture: ComponentFixture<EntrepreneurDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepreneurDashboardComponent]
    });
    fixture = TestBed.createComponent(EntrepreneurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
