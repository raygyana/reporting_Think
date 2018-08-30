import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtyponCompsComponent } from './atypon-comps.component';

describe('AtyponCompsComponent', () => {
  let component: AtyponCompsComponent;
  let fixture: ComponentFixture<AtyponCompsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtyponCompsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtyponCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
