import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledpageComponent } from './disabledpage.component';

describe('DisabledpageComponent', () => {
  let component: DisabledpageComponent;
  let fixture: ComponentFixture<DisabledpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
