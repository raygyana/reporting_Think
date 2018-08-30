import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSalesOrderComponent } from './annual-sales-order.component';

describe('AnnualSalesOrderComponent', () => {
  let component: AnnualSalesOrderComponent;
  let fixture: ComponentFixture<AnnualSalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualSalesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
