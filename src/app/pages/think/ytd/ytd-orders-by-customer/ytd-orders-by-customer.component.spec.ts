import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtdOrdersByCustomerComponent } from './ytd-orders-by-customer.component';

describe('YtdOrdersByCustomerComponent', () => {
  let component: YtdOrdersByCustomerComponent;
  let fixture: ComponentFixture<YtdOrdersByCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YtdOrdersByCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtdOrdersByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
