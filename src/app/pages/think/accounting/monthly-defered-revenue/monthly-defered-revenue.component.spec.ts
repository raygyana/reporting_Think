import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDeferedRevenueComponent } from './monthly-defered-revenue.component';

describe('MonthlyDeferedRevenueComponent', () => {
  let component: MonthlyDeferedRevenueComponent;
  let fixture: ComponentFixture<MonthlyDeferedRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyDeferedRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyDeferedRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
