import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCirc.ExcldPackComponent } from './detail-circ.excld-pack.component';

describe('DetailCirc.ExcldPackComponent', () => {
  let component: DetailCirc.ExcldPackComponent;
  let fixture: ComponentFixture<DetailCirc.ExcldPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCirc.ExcldPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCirc.ExcldPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
