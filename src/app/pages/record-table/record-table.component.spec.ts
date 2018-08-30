import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestIpDetailComponent } from './highest-ip-detail.component';

describe('HighestIpDetailComponent', () => {
  let component: HighestIpDetailComponent;
  let fixture: ComponentFixture<HighestIpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighestIpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestIpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
