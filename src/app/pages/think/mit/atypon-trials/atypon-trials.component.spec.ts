import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtyponTrialsComponent } from './atypon-trials.component';

describe('AtyponTrialsComponent', () => {
  let component: AtyponTrialsComponent;
  let fixture: ComponentFixture<AtyponTrialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtyponTrialsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtyponTrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
