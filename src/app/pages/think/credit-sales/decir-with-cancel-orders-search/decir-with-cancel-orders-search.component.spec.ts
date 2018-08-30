import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecirWithCancelOrdersSearchComponent } from './decir-with-cancel-orders-search.component';

describe('DecirWithCancelOrdersSearchComponent', () => {
  let component: DecirWithCancelOrdersSearchComponent;
  let fixture: ComponentFixture<DecirWithCancelOrdersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecirWithCancelOrdersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecirWithCancelOrdersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
