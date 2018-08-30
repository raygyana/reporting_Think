import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureExpiresWithNewOrdersComponent } from './future-expires-with-new-orders.component';

describe('FutureExpiresWithNewOrdersComponent', () => {
  let component: FutureExpiresWithNewOrdersComponent;
  let fixture: ComponentFixture<FutureExpiresWithNewOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureExpiresWithNewOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureExpiresWithNewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
