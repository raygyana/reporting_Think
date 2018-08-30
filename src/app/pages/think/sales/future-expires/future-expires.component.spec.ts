import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureExpiresComponent } from './future-expires.component';

describe('FutureExpiresComponent', () => {
  let component: FutureExpiresComponent;
  let fixture: ComponentFixture<FutureExpiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureExpiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureExpiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
