import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurCommunityComponent } from './entrepreneur-community.component';

describe('EntrepreneurCommunityComponent', () => {
  let component: EntrepreneurCommunityComponent;
  let fixture: ComponentFixture<EntrepreneurCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrepreneurCommunityComponent]
    });
    fixture = TestBed.createComponent(EntrepreneurCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
