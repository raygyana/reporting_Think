import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStockListComponent } from './inventory-stock-list.component';

describe('InventoryStockListComponent', () => {
  let component: InventoryStockListComponent;
  let fixture: ComponentFixture<InventoryStockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryStockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
