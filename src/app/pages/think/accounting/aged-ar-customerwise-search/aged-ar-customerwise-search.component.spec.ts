import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgedArCustomerwiseSearchComponent } from './aged-ar-customerwise-search.component';

describe('AgedArCustomerwiseSearchComponent', () => {
  let component: AgedArCustomerwiseSearchComponent;
  let fixture: ComponentFixture<AgedArCustomerwiseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgedArCustomerwiseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgedArCustomerwiseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
