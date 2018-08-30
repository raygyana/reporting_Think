import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkListDisplaySearchComponent } from './think-list-display-search.component';

describe('ThinkListDisplaySearchComponent', () => {
  let component: ThinkListDisplaySearchComponent;
  let fixture: ComponentFixture<ThinkListDisplaySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkListDisplaySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkListDisplaySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
