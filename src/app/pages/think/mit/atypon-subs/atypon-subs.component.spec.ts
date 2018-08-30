import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtyponSubsComponent } from './atypon-subs.component';

describe('AtyponSubsComponent', () => {
  let component: AtyponSubsComponent;
  let fixture: ComponentFixture<AtyponSubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtyponSubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtyponSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
