import {
  Component, OnInit, ViewChild,
  Input, AfterViewInit, forwardRef
} from '@angular/core';
import { AutoCompleteService } from './auto-complete.service';
import { FilterArrayPipe } from './auto-complete.pipe';
import { AutoCompleteModel } from './auto-complete.model';
import {
  FormControl,
  Validators, ControlValueAccessor, NG_VALUE_ACCESSOR,
  NG_VALIDATORS, Validator
} from '@angular/forms';

import { CustomFormControl } from '../Core';
import { ProjectUtils } from 'app/pages/shared/project-utils';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AutoCompleteComponent),
    multi: true,
  },
    AutoCompleteService]
})
export class AutoCompleteComponent extends CustomFormControl implements OnInit, AfterViewInit {

  @Input() basicSetting: AutoCompleteModel;
  @Input() passOnlyAccCode = false;

  t1; t2;

  @ViewChild('myInput') myInput: any;
  el: any;

  userFilter: any = ''
  showSearchResult: boolean;
  ulWidth: number;

  autoCompleteData: Array<string> = [];

  currentApiHitValue: string;
  prevApiHitValue: string = null;
  ownLoader: boolean;
  constructor(
    private autoCompleteService: AutoCompleteService
  ) {
    super();
  }

  ngOnInit() {
    this.errorCheckingForInput();

  }
  ngAfterViewInit() {
    this.setWidth();
    this.el = this.myInput.nativeElement;

  }

  assignValueToDisplay(obj) {
    this.userFilter = this.value = obj;
    return this.userFilter;
  }

  onInputChange(value: string) {

    const searchValue = value.substring(0, 3);

    if ((searchValue && searchValue.length === 3) && this.prevApiHitValue !== searchValue) {
      this.prevApiHitValue = searchValue;
      this.fetchDataFromApi(searchValue);
    }

    this.updateBeforePropagateChange(value);
  }


  fetchDataFromApi(str: string) {
    this.ownLoader = true;
    let searchStr = this.userFilter
    searchStr = searchStr.substring(0, 3);
    console.log('searchStr', searchStr, this.basicSetting)
    this.autoCompleteService.getData(this.basicSetting.url, {
      key: this.basicSetting.searchKey,
      value: searchStr
    })
      .subscribe((data) => {
        this.autoCompleteData = data;
        this.ownLoader = false;
        console.log('this.autoCompleteData', this.autoCompleteData)
      }, (e) => {
        this.ownLoader = false;
      })
  }

  onLiClick(val: string) {
    this.t2 = new Date();
    console.log('onLiClick', val, this.t2 - this.t1, 'abc')
    this.userFilter = val
    this.updateBeforePropagateChange(val);
    this.showSearchResult = false;
  }


  errorCheckingForInput() {
    if (!this.basicSetting.url) {
      throw new Error('AutoComplete should have url');
    }
    if (!this.basicSetting.searchKey) {
      throw new Error('AutoComplete should have search Key');
    }
  }

  onFocusout(val: string) {
    console.log('onFocusout')
    this.t1 = new Date();
    this.userFilter = val
    console.log('onFocusout', val)
    setTimeout(() => {
      this.updateBeforePropagateChange(this.userFilter);
      this.showSearchResult = false;
    }, 200)
  }

  onFocus(val: string) {
    console.log('onFocus', val)
    this.showSearchResult = true;
  }


  setWidth() {
    const ele: any = this.myInput.nativeElement.clientWidth;
    this.ulWidth = ele.clientWidth;
  }


  onFullBodyClick(value, event) {
    this.onFocusout(value);
  }


  updateBeforePropagateChange(value: string) {
    this.propagateChange(ProjectUtils.getValueFromAutoCompleteStr(value, this.passOnlyAccCode));
  }


  registerFocusOut() {
    this.el.onblur = this.hideListData
  }


  unregisterFocusOut() {
    this.el.onblur = null;
  }

  hideListData = () => {
    this.showSearchResult = false;
  };

}
