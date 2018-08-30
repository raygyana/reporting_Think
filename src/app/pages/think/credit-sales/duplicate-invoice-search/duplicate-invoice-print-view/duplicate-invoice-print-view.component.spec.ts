import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateInvoicePrintViewComponent } from './duplicate-invoice-print-view.component';

describe('DuplicateInvoicePrintViewComponent', () => {
  let component: DuplicateInvoicePrintViewComponent;
  let fixture: ComponentFixture<DuplicateInvoicePrintViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateInvoicePrintViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateInvoicePrintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
