import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcierWithDocRefComponent } from './dcier-with-doc-ref.component';

describe('DcierWithDocRefComponent', () => {
  let component: DcierWithDocRefComponent;
  let fixture: ComponentFixture<DcierWithDocRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcierWithDocRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcierWithDocRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
