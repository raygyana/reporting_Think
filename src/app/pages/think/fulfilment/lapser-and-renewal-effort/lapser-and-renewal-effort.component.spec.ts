import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapserAndRenewalEffortComponent } from './lapser-and-renewal-effort.component';

describe('LapserAndRenewalEffortComponent', () => {
  let component: LapserAndRenewalEffortComponent;
  let fixture: ComponentFixture<LapserAndRenewalEffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapserAndRenewalEffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapserAndRenewalEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
