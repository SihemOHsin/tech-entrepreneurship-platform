import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurLayoutComponent } from './entrepreneur-layout.component';

describe('EntrepreneurLayoutComponent', () => {
  let component: EntrepreneurLayoutComponent;
  let fixture: ComponentFixture<EntrepreneurLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepreneurLayoutComponent]
    });
    fixture = TestBed.createComponent(EntrepreneurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
