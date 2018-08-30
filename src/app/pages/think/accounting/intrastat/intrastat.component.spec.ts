import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrastatComponent } from './intrastat.component';

describe('IntrastatComponent', () => {
  let component: IntrastatComponent;
  let fixture: ComponentFixture<IntrastatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrastatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrastatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
