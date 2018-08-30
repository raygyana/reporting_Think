import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendTabComponent } from './trend-tab.component';

describe('TrendTabComponent', () => {
  let component: TrendTabComponent;
  let fixture: ComponentFixture<TrendTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
