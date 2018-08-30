import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverduePaymentSearchComponent } from './overdue-payment-search.component';

describe('OverduePaymentSearchComponent', () => {
  let component: OverduePaymentSearchComponent;
  let fixture: ComponentFixture<OverduePaymentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverduePaymentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverduePaymentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
