import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCirculationForPackComponent } from './details-circulation-for-pack.component';

describe('DetailsCirculationForPackComponent', () => {
  let component: DetailsCirculationForPackComponent;
  let fixture: ComponentFixture<DetailsCirculationForPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCirculationForPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCirculationForPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
