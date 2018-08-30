import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatEslComponent } from './vat-esl.component';

describe('VatEslComponent', () => {
  let component: VatEslComponent;
  let fixture: ComponentFixture<VatEslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatEslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatEslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
