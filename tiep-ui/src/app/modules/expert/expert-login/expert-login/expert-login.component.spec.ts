import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertLoginComponent } from './expert-login.component';

describe('ExpertLoginComponent', () => {
  let component: ExpertLoginComponent;
  let fixture: ComponentFixture<ExpertLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertLoginComponent]
    });
    fixture = TestBed.createComponent(ExpertLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
