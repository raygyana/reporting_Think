import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesCustomerSalesComponent } from './agencies-customer-sales.component';

describe('AgenciesCustomerSalesComponent', () => {
  let component: AgenciesCustomerSalesComponent;
  let fixture: ComponentFixture<AgenciesCustomerSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenciesCustomerSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenciesCustomerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
