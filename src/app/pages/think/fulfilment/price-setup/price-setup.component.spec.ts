import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSetupComponent } from './price-setup.component';

describe('PriceSetupComponent', () => {
  let component: PriceSetupComponent;
  let fixture: ComponentFixture<PriceSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
