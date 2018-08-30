import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureEarningComponent } from './future-earning.component';

describe('FutureEarningComponent', () => {
  let component: FutureEarningComponent;
  let fixture: ComponentFixture<FutureEarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureEarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
