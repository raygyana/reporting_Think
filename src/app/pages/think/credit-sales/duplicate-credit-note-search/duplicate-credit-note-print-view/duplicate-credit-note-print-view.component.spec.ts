import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateCreditNotePrintViewComponent } from './duplicate-credit-note-print-view.component';

describe('DuplicateInvoicePrintViewComponent', () => {
  let component: DuplicateCreditNotePrintViewComponent;
  let fixture: ComponentFixture<DuplicateCreditNotePrintViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateCreditNotePrintViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateCreditNotePrintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
