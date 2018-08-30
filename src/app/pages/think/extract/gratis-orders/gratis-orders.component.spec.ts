import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratisOrdersComponent } from './gratis-orders.component';

describe('GratisOrdersComponent', () => {
  let component: GratisOrdersComponent;
  let fixture: ComponentFixture<GratisOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratisOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratisOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
