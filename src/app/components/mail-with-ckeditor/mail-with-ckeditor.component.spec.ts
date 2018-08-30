import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailWithCkeditorComponent } from './mail-with-ckeditor.component';

describe('MailWithCkeditorComponent', () => {
  let component: MailWithCkeditorComponent;
  let fixture: ComponentFixture<MailWithCkeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailWithCkeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailWithCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
