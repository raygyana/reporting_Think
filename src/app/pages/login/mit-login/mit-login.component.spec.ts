import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitLoginComponent } from './mit-login.component';

describe('MitLoginComponent', () => {
  let component: MitLoginComponent;
  let fixture: ComponentFixture<MitLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
