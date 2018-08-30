import {
  AfterViewInit, Component, OnInit, ViewChild, forwardRef
} from '@angular/core';

import {
  FormControl,
  Validators, ControlValueAccessor, NG_VALUE_ACCESSOR,
  NG_VALIDATORS, Validator
} from '@angular/forms';

import { CustomFormControl } from '../Core';


@Component({
  selector: 'app-custom-ckeditor',
  templateUrl: './custom-ckeditor.component.html',
  styleUrls: ['./custom-ckeditor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCkeditorComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomCkeditorComponent),
      multi: true,
    }]
})
export class CustomCkeditorComponent extends CustomFormControl implements OnInit {


  ckeditorContent: any;
  constructor() {
    super();
    this.ckeditorContent = ``;
  }

  ngOnInit() {
  }



  onReady(event: any) {
    console.log('CustomCkeditorComponent onReady', event);
  }


  onChange(event: any) {
    this.propagateChange(this.ckeditorContent);
  }
  onFocus(event: any) {
    this.propagateChange(this.ckeditorContent);

  }
  onBlur(event: any) {
    this.propagateChange(this.ckeditorContent);

  }
}
