import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadDebtorsSearchComponent } from './bad-debtors-search.component';

describe('BadDebtorsSearchComponent', () => {
  let component: BadDebtorsSearchComponent;
  let fixture: ComponentFixture<BadDebtorsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadDebtorsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadDebtorsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
