import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateInvoiceSearchComponent } from './duplicate-invoice-search.component';

describe('DuplicateInvoiceSearchComponent', () => {
  let component: DuplicateInvoiceSearchComponent;
  let fixture: ComponentFixture<DuplicateInvoiceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateInvoiceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateInvoiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
