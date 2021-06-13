import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterFeedListComponent } from './center-feed-list.component';

describe('CenterFeedListComponent', () => {
  let component: CenterFeedListComponent;
  let fixture: ComponentFixture<CenterFeedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterFeedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterFeedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
