import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSummaryForCancelOrdersComponent } from './sales-summary-for-cancel-orders.component';

describe('SalesSummaryForCancelOrdersComponent', () => {
  let component: SalesSummaryForCancelOrdersComponent;
  let fixture: ComponentFixture<SalesSummaryForCancelOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSummaryForCancelOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSummaryForCancelOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
