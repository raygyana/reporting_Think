import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSummaryDetailsComponent } from './sales-summary-details.component';

describe('SalesSummaryDetailsComponent', () => {
  let component: SalesSummaryDetailsComponent;
  let fixture: ComponentFixture<SalesSummaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSummaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
