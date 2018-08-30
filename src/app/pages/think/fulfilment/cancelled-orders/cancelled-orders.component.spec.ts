import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledOrdersComponent } from './cancelled-orders.component';

describe('CancelledOrdersComponent', () => {
  let component: CancelledOrdersComponent;
  let fixture: ComponentFixture<CancelledOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
