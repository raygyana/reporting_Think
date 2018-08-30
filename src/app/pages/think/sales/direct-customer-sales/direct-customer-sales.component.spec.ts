import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCustomerSalesComponent } from './direct-customer-sales.component';

describe('DirectCustomerSalesComponent', () => {
  let component: DirectCustomerSalesComponent;
  let fixture: ComponentFixture<DirectCustomerSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectCustomerSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCustomerSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
