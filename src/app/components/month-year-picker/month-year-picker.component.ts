import {
  Component, OnInit, forwardRef,
  AfterViewInit, Input
} from '@angular/core';
import {
  FormControl,
  Validators, ControlValueAccessor, NG_VALUE_ACCESSOR,
  NG_VALIDATORS, Validator
} from '@angular/forms';
import { monthsData } from './data';
import { CustomFormControl } from '../Core';
import { IDGeneratorService } from '../../core';
import { MonthYearOutputModel, MonthYearModel } from './month-year.model';
import { SessionObject, ProjectUtils } from '../../pages/shared';


declare var $;
@Component({
  selector: 'app-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearPickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MonthYearPickerComponent),
      multi: true,
    }]
})
export class MonthYearPickerComponent extends CustomFormControl implements OnInit, AfterViewInit {


  sessionObject: SessionObject = SessionObject.getSessionObject();
  startDateElement: any;
  endDateElement: any;
  monthYearOutputModel: MonthYearOutputModel;

  firstID: string;
  secondID: string;

  @Input() monthYearModel: MonthYearModel;

  onChageFn = () => {
    this.startDateElement.value = this.startDateElement.value.replace('/', '-');
    let endDateValue = null;
    if (!this.monthYearModel.showSingleDate) {
      endDateValue = this.endDateElement.value = this.endDateElement.value.replace('/', '-');
    } else {
      endDateValue = null;
    }
    this.value = this.monthYearModel.BaseComponent.setMonthYear(this.startDateElement.value, endDateValue);
    this.propagateChange(this.value);

  }


  assignValueToDisplay(obj: any) {
    if (obj === 'reset') {
      this.value = this.monthYearModel.BaseComponent.resetMonthYear();

    }
    //  else {
    //       //   obj = obj || {};
    //   if (ProjectUtils.objIsAllTheseKeysEmpty(obj, 'from', 'to')) {
    //     this.value = obj;
    //   }
    // }
    this.propagateChange(this.value);
    return 'notEmpty'
  }


  constructor(
    private idGeneratorService: IDGeneratorService
  ) {
    super();
    this.firstID = this.idGeneratorService.generateNormalIDs('year-month');
    this.secondID = this.idGeneratorService.generateNormalIDs('year-month');
  }



  public validate(c: FormControl) {
    const empty = ProjectUtils.isEmpty(this.value['endKey']);
    const empty2 = ProjectUtils.isEmpty(this.value['startKey']);
    if ((empty || empty2) && this.isrequired && !this.isDisabled) {
      return {
        empty: {
          valid: !(empty || empty2)
        }
      }
    } else {
      return null;
    }
  }


  createDates() {
    this.monthYearOutputModel = new MonthYearOutputModel(this.monthYearModel.fistDate, this.monthYearModel.secDate);
  }


  ngOnInit() {
    this.createDates();
  }

  ngAfterViewInit() {
    this.setDateSetting();
    this.inItOnChange();
    this.onChageFn();
  }



  setDateSetting() {
    let startDate = new Date();
    let FromEndDate = new Date();
    // '.from'
    const liveYear = SessionObject.liveYear;
    const StartliveMonth = parseInt(<string>SessionObject.liveMonth, 10) + 1;
    const liveMonth = SessionObject.liveMonth;
    const startLimit = ('0' + StartliveMonth).slice(-2) + '/' + (liveYear - 3);
    const endLimit = ('0' + liveMonth).slice(-2) + '/' + (liveYear);


    $(`#${this.firstID}`).datepicker({
      autoclose: true,
      minViewMode: 1,
      format: 'mm/yyyy',
      startDate: startLimit, //'-36m',
      endDate: endLimit // '+2d'
    }).on('changeDate', function (selected) {
      startDate = new Date(selected.date.valueOf());
      // startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
      $(`#${this.secondID}`).datepicker('setStartDate', startDate);
    });

    $(`#${this.secondID}`).datepicker({
      autoclose: true,
      minViewMode: 1,
      format: 'mm/yyyy',
      startDate: startLimit, //'-36m',
      endDate: endLimit // '+2d'
    }).on('changeDate', function (selected) {
      FromEndDate = new Date(selected.date.valueOf());
      //  FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
      $(`#${this.firstID}`).datepicker('setEndDate', FromEndDate);
    });
  }



  inItOnChange() {
    this.startDateElement = document.getElementById(this.firstID);
    this.startDateElement.value = this.monthYearOutputModel.fistDate;
    this.startDateElement.onchange = this.onChageFn;

    if (!this.monthYearModel.showSingleDate) {
      this.endDateElement = document.getElementById(this.secondID);
      this.endDateElement.value = this.monthYearOutputModel.secDate;
      this.endDateElement.onchange = this.onChageFn
    }

  }


}
