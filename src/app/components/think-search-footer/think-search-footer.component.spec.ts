import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkSearchFooterComponent } from './think-search-footer.component';

describe('ThinkSearchFooterComponent', () => {
  let component: ThinkSearchFooterComponent;
  let fixture: ComponentFixture<ThinkSearchFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkSearchFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkSearchFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
