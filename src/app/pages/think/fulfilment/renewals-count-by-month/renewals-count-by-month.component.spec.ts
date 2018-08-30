import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalsCountByMonthComponent } from './renewals-count-by-month.component';

describe('RenewalsCountByMonthComponent', () => {
  let component: RenewalsCountByMonthComponent;
  let fixture: ComponentFixture<RenewalsCountByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalsCountByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalsCountByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
