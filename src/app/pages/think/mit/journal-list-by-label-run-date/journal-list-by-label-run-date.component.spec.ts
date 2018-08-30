import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalListByLabelRunDateComponent } from './journal-list-by-label-run-date.component';

describe('JournalListByLabelRunDateComponent', () => {
  let component: JournalListByLabelRunDateComponent;
  let fixture: ComponentFixture<JournalListByLabelRunDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalListByLabelRunDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalListByLabelRunDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
