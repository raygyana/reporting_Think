import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentByCurrencyComponent } from './payment-by-currency.component';

describe('PaymentByCurrencyComponent', () => {
  let component: PaymentByCurrencyComponent;
  let fixture: ComponentFixture<PaymentByCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentByCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentByCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
