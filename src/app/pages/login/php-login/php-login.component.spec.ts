import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhpLoginComponent } from './php-login.component';

describe('PhpLoginComponent', () => {
  let component: PhpLoginComponent;
  let fixture: ComponentFixture<PhpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhpLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
