import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleIssueOrdersComponent } from './single-issue-orders.component';

describe('SingleIssueOrdersComponent', () => {
  let component: SingleIssueOrdersComponent;
  let fixture: ComponentFixture<SingleIssueOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleIssueOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleIssueOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
