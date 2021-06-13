import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeedpageComponent } from './home-feedpage.component';

describe('HomeFeedpageComponent', () => {
  let component: HomeFeedpageComponent;
  let fixture: ComponentFixture<HomeFeedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFeedpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
