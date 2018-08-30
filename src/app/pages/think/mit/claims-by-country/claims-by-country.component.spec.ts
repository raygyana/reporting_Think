import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsByCountryComponent } from './claims-by-country.component';

describe('ClaimsByCountryComponent', () => {
  let component: ClaimsByCountryComponent;
  let fixture: ComponentFixture<ClaimsByCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsByCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
