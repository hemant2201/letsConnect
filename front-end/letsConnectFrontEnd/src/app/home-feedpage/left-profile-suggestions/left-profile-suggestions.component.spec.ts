import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftProfileSuggestionsComponent } from './left-profile-suggestions.component';

describe('LeftProfileSuggestionsComponent', () => {
  let component: LeftProfileSuggestionsComponent;
  let fixture: ComponentFixture<LeftProfileSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftProfileSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftProfileSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
