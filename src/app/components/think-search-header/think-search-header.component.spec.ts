import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkSearchHeaderComponent } from './think-search-header.component';

describe('ThinkSearchHeaderComponent', () => {
  let component: ThinkSearchHeaderComponent;
  let fixture: ComponentFixture<ThinkSearchHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkSearchHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
