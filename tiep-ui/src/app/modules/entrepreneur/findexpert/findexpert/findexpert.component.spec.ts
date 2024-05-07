import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindexpertComponent } from './findexpert.component';

describe('FindexpertComponent', () => {
  let component: FindexpertComponent;
  let fixture: ComponentFixture<FindexpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindexpertComponent]
    });
    fixture = TestBed.createComponent(FindexpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
