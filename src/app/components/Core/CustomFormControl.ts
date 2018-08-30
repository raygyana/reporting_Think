import {
      FormControl,
      Validators, ControlValueAccessor, NG_VALUE_ACCESSOR,
      NG_VALIDATORS, Validator
} from '@angular/forms';

import { Utils } from '../../pages/shared/utils';
import { Input } from '@angular/core';

export class CustomFormControl implements ControlValueAccessor {
      @Input() isrequired: boolean;
      @Input() isDisabled: boolean;
      @Input() myName;
      @Input() minmumLength: boolean;

      value: any;

      onTouched: any = () => { };


      debuggerWithName() {
            if (this.myName === 'dynamicabc') {
            }
      }

      public writeValue(obj: any) {
            console.log('writeValue----', obj)

            if (this.assignValueToDisplay(obj) === undefined) {
                  this.value = obj;
            }


            // this.assignValueToDisplay();
            // this.debuggerWithName();
      }

      assignValueToDisplay(obj?: any) {
            return undefined;
      }

      constructor() {
      }

      public registerOnChange(fn: any) {
            this.propagateChange = fn;
      }

      public validate(c: FormControl) {

            let retVal: any;
            this.debuggerWithName();
            const empty = Utils.isEmpty(this.value);
            if (empty && this.isrequired && !this.isDisabled) {

                  if (typeof retVal !== 'object') {
                        retVal = {}
                  }
                  retVal['empty'] = {
                        valid: !empty
                  }
            }

            let min = null;
            if (this.minmumLength) {
                  min = this.value.length >= this.minmumLength;

                  if (min && this.isrequired && !this.isDisabled) {
                        this.singleErrorChecking(retVal, 'min', min);
                  }
            }

            return retVal;
      }

      singleErrorChecking(obj: any, error: string, status: boolean) {
            if (typeof obj !== 'object') {
                  obj = {}
            }
            obj[error] = {
                  valid: status
            }
            return obj;
      }



      public registerOnTouched() { }


      protected propagateChange = (_: any) => {
      };
}
