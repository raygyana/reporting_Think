import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPaymentCollectionSearchComponent } from './credit-payment-collection-search.component';

describe('CreditPaymentCollectionSearchComponent', () => {
  let component: CreditPaymentCollectionSearchComponent;
  let fixture: ComponentFixture<CreditPaymentCollectionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditPaymentCollectionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPaymentCollectionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
