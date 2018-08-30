import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionSalesComponent } from './region-sales.component';

describe('RegionSalesComponent', () => {
  let component: RegionSalesComponent;
  let fixture: ComponentFixture<RegionSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
