import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcpLoginComponent } from './ucp-login.component';

describe('UcpLoginComponent', () => {
  let component: UcpLoginComponent;
  let fixture: ComponentFixture<UcpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcpLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
