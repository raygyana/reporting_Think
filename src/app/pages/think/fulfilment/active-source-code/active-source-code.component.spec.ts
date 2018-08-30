import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSourceCodeComponent } from './active-source-code.component';

describe('ActiveSourceCodeComponent', () => {
  let component: ActiveSourceCodeComponent;
  let fixture: ComponentFixture<ActiveSourceCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSourceCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSourceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
