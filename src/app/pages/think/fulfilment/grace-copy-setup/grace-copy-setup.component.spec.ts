import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraceCopySetupComponent } from './grace-copy-setup.component';

describe('GraceCopySetupComponent', () => {
  let component: GraceCopySetupComponent;
  let fixture: ComponentFixture<GraceCopySetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraceCopySetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraceCopySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
