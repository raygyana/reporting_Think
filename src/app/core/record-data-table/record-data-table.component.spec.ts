import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDataTableComponent } from './record-data-table.component';

describe('RecordDataTableComponent', () => {
  let component: RecordDataTableComponent;
  let fixture: ComponentFixture<RecordDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
