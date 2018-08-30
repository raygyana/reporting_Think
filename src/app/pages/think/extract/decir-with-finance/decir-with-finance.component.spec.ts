import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecirWithFinanceComponent } from './decir-with-finance.component';

describe('DecirWithFinanceComponent', () => {
  let component: DecirWithFinanceComponent;
  let fixture: ComponentFixture<DecirWithFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecirWithFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecirWithFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
