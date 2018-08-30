import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByRegionComponent } from './sales-by-region.component';

describe('SalesByRegionComponent', () => {
  let component: SalesByRegionComponent;
  let fixture: ComponentFixture<SalesByRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesByRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
