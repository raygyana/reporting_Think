import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCirculationforUcppackComponent } from './detail-circulationfor-ucppack.component';

describe('DetailCirculationforUcppackComponent', () => {
  let component: DetailCirculationforUcppackComponent;
  let fixture: ComponentFixture<DetailCirculationforUcppackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCirculationforUcppackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCirculationforUcppackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
