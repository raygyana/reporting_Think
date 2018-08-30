import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNProductsComponent } from './top-n-products.component';

describe('TopNProductsComponent', () => {
  let component: TopNProductsComponent;
  let fixture: ComponentFixture<TopNProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
