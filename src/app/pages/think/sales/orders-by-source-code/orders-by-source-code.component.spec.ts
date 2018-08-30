import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersBySourceCodeComponent } from './orders-by-source-code.component';

describe('OrdersBySourceCodeComponent', () => {
  let component: OrdersBySourceCodeComponent;
  let fixture: ComponentFixture<OrdersBySourceCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersBySourceCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersBySourceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
