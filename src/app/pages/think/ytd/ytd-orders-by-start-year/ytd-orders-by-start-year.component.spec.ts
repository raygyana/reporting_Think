import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtdOrdersByStartYearComponent } from './ytd-orders-by-start-year.component';

describe('YtdOrdersByStartYearComponent', () => {
  let component: YtdOrdersByStartYearComponent;
  let fixture: ComponentFixture<YtdOrdersByStartYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YtdOrdersByStartYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtdOrdersByStartYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
