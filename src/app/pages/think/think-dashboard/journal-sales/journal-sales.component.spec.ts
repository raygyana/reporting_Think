import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalSalesComponent } from './journal-sales.component';

describe('JournalSalesComponent', () => {
  let component: JournalSalesComponent;
  let fixture: ComponentFixture<JournalSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
