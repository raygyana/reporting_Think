import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtdAmountByStartYearComponent } from './ytd-amount-by-start-year.component';

describe('YtdAmountByStartYearComponent', () => {
  let component: YtdAmountByStartYearComponent;
  let fixture: ComponentFixture<YtdAmountByStartYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YtdAmountByStartYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtdAmountByStartYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
