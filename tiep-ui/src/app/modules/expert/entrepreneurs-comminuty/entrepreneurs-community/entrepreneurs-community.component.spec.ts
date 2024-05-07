import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneursCommunityComponent } from './entrepreneurs-community.component';

describe('EntrepreneursCommunityComponent', () => {
  let component: EntrepreneursCommunityComponent;
  let fixture: ComponentFixture<EntrepreneursCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepreneursCommunityComponent]
    });
    fixture = TestBed.createComponent(EntrepreneursCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
