import {
  Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef,
  OnDestroy, ViewChild
} from '@angular/core';
// import { CompleterService, CompleterData } from 'ng2-completer';
import { CompleterService, CompleterData } from '../Completer';
import { ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { MyAutoCompleteModel } from './my-auto-complete.model';
import { AutoCompleteService } from './my-auto-complete.service';
import { SessionObject, ProjectUtils, Utils } from '../../pages/shared/shared';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const MY_NG_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyAutoCompleteComponent),
  multi: true,
};

const MY_NG_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MyAutoCompleteComponent),
  multi: true,
};


@Component({
  selector: 'app-my-auto-complete',
  templateUrl: './my-auto-complete.component.html',
  styleUrls: ['./my-auto-complete.component.css'],
  providers: [
    MY_NG_VALUE_ACCESSOR,
    MY_NG_VALIDATORS,
    AutoCompleteService
  ]
})

export class MyAutoCompleteComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {

  @Input() public tiggerData: Subject<any>;
  @Input() public BasicSetting: MyAutoCompleteModel

  @Output() public selectedEvent = new EventEmitter<any>();

  $tiggerData: Subscription;
  $autoCompleteService: Subscription;
  mySetting: MyAutoCompleteModel;

  public searchStr: string;
  public lastSearchStr: string;
  public dataService: CompleterData;
  loaderActive: boolean;

  constructor(
    private completerService: CompleterService,
    private autoCompleteService: AutoCompleteService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.mySetting = new MyAutoCompleteModel();
    console.log('Contructor Setting...', this.mySetting);
  }

  ngOnInit() {
    this.initSetting();
  }



  writeValue(obj: any): void {
    if (obj) {
      this.searchStr = obj;
    } else {
      this.searchStr = '';
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  validate(c: FormControl): { [key: string]: any } {

    if (!this.searchStr) {
      return {
        empty: {
          valid: false
        }
      };
    } else {
      return null;
    }
  }

  private propagateChange = (_: any) => {

  }



  initSetting() {

    this.basicSettingErrorChecking();

    this.BasicSetting.descriptionField = (this.BasicSetting.descriptionField || this.BasicSetting.searchFields);

    if (this.tiggerData instanceof Subject) {
      this.$tiggerData = this.tiggerData
        .subscribe((data) => {
          console.log('tiggerData tiggerData', data);
          this.BasicSetting.descriptionField = (this.BasicSetting.descriptionField || this.BasicSetting.searchFields);
          this.dataService = this.completerService.local(data, this.BasicSetting.searchFields, this.BasicSetting.descriptionField);
          this.changeDetectorRef.detectChanges();
        });

    } else {
      this.dataService = this.completerService.local([], this.BasicSetting.searchFields, this.BasicSetting.descriptionField);
    }

  }


  onDataSourceChange(data) {
    console.log('dataSourceChange', data);
  }

  fetchAutoCompleteData() {
    console.log('fetchAutoCompleteData');
    const tempStr = this.searchStr;
    this.searchStr = '';
    this.myShowLoader();
    this.mySetting.disableInput = true;
    this.mySetting.placeholder = tempStr;
    this.$autoCompleteService = this.autoCompleteService
      .getAutoCompleteData(this.mySetting.url, this.searchStr)
      .subscribe(data => {
        console.log('********************************************************', this.BasicSetting, data);
        this.dataService = this.completerService.local(this.setMyData(data), 'description', 'description');

        console.log('this.searchStr', this.searchStr, this.dataService);
        setTimeout(() => {
          this.searchStr = tempStr;
          this.mySetting.disableInput = false;
          this.mySetting.placeholder = '';
          this.dataService.search(this.searchStr);
        }, 500);

        this.dataService.dataSourceChange.subscribe((data) => {
          console.log('dataSourceChange', data);
        })
        this.changeDetectorRef.detectChanges();


        this.myHideLoader();
      }, err => {
        //   this.logger.error('DataDropDownComponent', 'loadData', 'Error loading drop down Data!');
        this.myHideLoader();
      });
  }






  onNgModelChange(event: any) {
    console.log('onNgModelChange', event);
    // this.searchStr = event.toLocaleLowerCase();

  }
  onKeyup() {
    console.log('onKeyup', event);
    this.checkNCallFetchAutoCompleteData();

  }


  checkNCallFetchAutoCompleteData() {
    console.log(typeof this.searchStr)

    if ((typeof this.searchStr === 'string') && (this.searchStr.length === 3) && (this.lastSearchStr !== this.searchStr)) {
      this.lastSearchStr = this.searchStr;
      this.fetchAutoCompleteData();
    }
  }

  onSelected(event: any) {
    this.propagateChange(event && event.title);
    console.log(event && event.title);
  }


  setMyData(data: Array<any>) {
    const tempData = [];
    const myKey = this.BasicSetting.searchFields.toString();

    data.forEach((item) => {
      const myObj = {};
      myObj[myKey] = item[myKey];
      tempData.push(myObj);
    });

    tempData.length = 100;
    console.log('setMyData', tempData);
    return tempData;
  }




  basicSettingErrorChecking() {
    this.mySetting = Object.assign(this.mySetting, this.BasicSetting);

    if (!this.mySetting['searchFields']) {
      throw new Error('AutoComplete must has value for key searchFields');
    }

    if (!this.mySetting.baseComponent) {
      throw new Error('AutoComplete must have a "Base Component" attribute.');
    }


    if (!this.mySetting.modelName) {
      throw new Error('AutoComplete must have a "modelName" attribute.');
    }
  }

  ngOnDestroy() {
    Utils.unsubscribe(this.$tiggerData, this.$autoCompleteService);
  }


  myShowLoader() {
    this.loaderActive = true;
  }
  myHideLoader() {
    this.loaderActive = false;
  }
}
