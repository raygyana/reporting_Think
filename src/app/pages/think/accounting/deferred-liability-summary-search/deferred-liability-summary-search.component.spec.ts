import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDepositSearchComponent } from './customer-deposit-search.component';

describe('CustomerDepositSearchComponent', () => {
  let component: CustomerDepositSearchComponent;
  let fixture: ComponentFixture<CustomerDepositSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDepositSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDepositSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
