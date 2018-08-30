import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatExemptComponent } from './vat-exempt.component';

describe('VatExemptComponent', () => {
  let component: VatExemptComponent;
  let fixture: ComponentFixture<VatExemptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatExemptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatExemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
