import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkDashboardComponent } from './think-dashboard.component';

describe('ThinkDashboardComponent', () => {
  let component: ThinkDashboardComponent;
  let fixture: ComponentFixture<ThinkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
