import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByCategorySearchComponent } from './sales-by-category-search.component';

describe('SalesByCategorySearchComponent', () => {
  let component: SalesByCategorySearchComponent;
  let fixture: ComponentFixture<SalesByCategorySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesByCategorySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByCategorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
