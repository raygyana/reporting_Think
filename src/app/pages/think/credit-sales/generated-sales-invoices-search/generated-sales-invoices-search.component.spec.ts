import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedSalesInvoicesSearchComponent } from './generated-sales-invoices-search.component';

describe('GeneratedSalesInvoicesSearchComponent', () => {
  let component: GeneratedSalesInvoicesSearchComponent;
  let fixture: ComponentFixture<GeneratedSalesInvoicesSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedSalesInvoicesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedSalesInvoicesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
