import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtyponCompsOfferCodeComponent } from './Atypon-Comps-w-OfferCode.component';

describe('AtyponCompsOfferCodeComponent', () => {
  let component: AtyponCompsOfferCodeComponent;
  let fixture: ComponentFixture<AtyponCompsOfferCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtyponCompsOfferCodeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtyponCompsOfferCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
