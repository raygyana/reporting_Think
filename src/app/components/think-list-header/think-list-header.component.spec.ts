import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkListHeaderComponent } from './think-list-header.component';

describe('ThinkListHeaderComponent', () => {
  let component: ThinkListHeaderComponent;
  let fixture: ComponentFixture<ThinkListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
