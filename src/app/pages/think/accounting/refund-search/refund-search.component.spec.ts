import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxLiabilitySearchComponent } from './tax-liability-search.component';

describe('TaxLiabilitySearchComponent', () => {
  let component: TaxLiabilitySearchComponent;
  let fixture: ComponentFixture<TaxLiabilitySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxLiabilitySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxLiabilitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
