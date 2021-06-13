import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightExtraInfoComponent } from './right-extra-info.component';

describe('RightExtraInfoComponent', () => {
  let component: RightExtraInfoComponent;
  let fixture: ComponentFixture<RightExtraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightExtraInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightExtraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
