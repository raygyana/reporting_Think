import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CzDatePickerComponent } from './cz-date-picker.component';

describe('CzDatePickerComponent', () => {
  let component: CzDatePickerComponent;
  let fixture: ComponentFixture<CzDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CzDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CzDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
