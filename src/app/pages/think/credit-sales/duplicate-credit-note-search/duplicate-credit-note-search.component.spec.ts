import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateCreditNoteSearchComponent } from './duplicate-credit-note-search.component';

describe('DuplicateCreditNoteSearchComponent', () => {
  let component: DuplicateCreditNoteSearchComponent;
  let fixture: ComponentFixture<DuplicateCreditNoteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateCreditNoteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateCreditNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
