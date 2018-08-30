import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSummarySearchComponent } from './sales-summary-search.component';

describe('SalesSummarySearchComponent', () => {
  let component: SalesSummarySearchComponent;
  let fixture: ComponentFixture<SalesSummarySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesSummarySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSummarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
