import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapserReportComponent } from './lapser-report.component';

describe('LapserReportComponent', () => {
  let component: LapserReportComponent;
  let fixture: ComponentFixture<LapserReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapserReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
