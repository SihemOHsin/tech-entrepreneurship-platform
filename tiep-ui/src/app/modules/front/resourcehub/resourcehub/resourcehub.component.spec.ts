import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcehubComponent } from './resourcehub.component';

describe('ResourcehubComponent', () => {
  let component: ResourcehubComponent;
  let fixture: ComponentFixture<ResourcehubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourcehubComponent]
    });
    fixture = TestBed.createComponent(ResourcehubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
