import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedCreditNotesSearchComponent } from './generated-credit-notes-search.component';

describe('GeneratedCreditNotesSearchComponent', () => {
  let component: GeneratedCreditNotesSearchComponent;
  let fixture: ComponentFixture<GeneratedCreditNotesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedCreditNotesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedCreditNotesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
