import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtWithComponentComponent } from './dt-with-component.component';

describe('DtWithComponentComponent', () => {
  let component: DtWithComponentComponent;
  let fixture: ComponentFixture<DtWithComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtWithComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtWithComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
