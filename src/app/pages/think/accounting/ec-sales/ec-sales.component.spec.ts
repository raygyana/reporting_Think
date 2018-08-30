import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSalesComponent } from './ec-sales.component';

describe('EcSalesComponent', () => {
  let component: EcSalesComponent;
  let fixture: ComponentFixture<EcSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
