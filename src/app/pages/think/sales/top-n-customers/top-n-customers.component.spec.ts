import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNCustomersComponent } from './top-n-customers.component';

describe('TopNCustomersComponent', () => {
  let component: TopNCustomersComponent;
  let fixture: ComponentFixture<TopNCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
