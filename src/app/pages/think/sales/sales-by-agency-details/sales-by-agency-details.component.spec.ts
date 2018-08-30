import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByAgencyDetailsComponent } from './sales-by-agency-details.component';

describe('SalesByAgencyDetailsComponent', () => {
  let component: SalesByAgencyDetailsComponent;
  let fixture: ComponentFixture<SalesByAgencyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesByAgencyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByAgencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
