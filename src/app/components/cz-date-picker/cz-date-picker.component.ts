import {
    Component, OnInit, Input, Output,
    EventEmitter, ViewChild, OnChanges, AfterViewInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Utils } from '../../pages/shared/utils';
import { SearchModelType } from '../../pages/shared/search-model-type';
import { DaterangePickerComponent } from 'ng2-daterangepicker';





declare var moment: any;

@Component({
    selector: 'app-cz-date-picker',
    templateUrl: './cz-date-picker.component.html',
    styleUrls: ['./cz-date-picker.component.css'],
    providers: [DatePipe]
})
export class CzDatePickerComponent /*extends Daterangepicker*/ implements OnInit, OnChanges, AfterViewInit {
    @Input() defaultInput: any;
    @Input() dataInput: any;
    @Input() dateFormat: 'MMM dd, yyyy';
    @Input() singleDatePickerState = false;
    @Output() onSelect = new EventEmitter<string>();
    @ViewChild(DaterangePickerComponent) picker: DaterangePickerComponent;

    @Input() initBlank: boolean;
    @Input() minDate: string; // MM/DD/YYYY
    @Input() maxDate: string; // MM/DD/YYYY
    @Input() noRangeSelection = true;

    displayValue: any;

    dateOptions: any = {
        'showDropdowns': true,
        'cancelClass': 'btn-danger',
        singleDatePicker: false,
        alwaysShowCalendars: false,
        locale: {
            cancelLabel: 'Clear',
            format: 'MMM DD, YYYY'
        },
        ranges: {
            'Last Month': [moment().subtract(1, 'month'), moment()],
            'Last 3 Months': [moment().subtract(3, 'month'), moment()],
            'Last 6 Months': [moment().subtract(6, 'month'), moment()],
            'Last 12 Months': [moment().subtract(12, 'month'), moment()],
        }
        // "autoApply": true
    }



    constructor(private datePipe: DatePipe) {
    }


    ngAfterViewInit() {
        console.log(this.picker)

        this.picker.applyDaterangepicker.subscribe((event) => {

            this.setNewValue(event.picker.startDate, event.picker.endDate);
        });
    }

    ngOnChanges() {
        this.dateOptions.singleDatePicker = this.singleDatePickerState;
        if (this.noRangeSelection === false) {
            this.dateOptions.ranges = [];
        }
        if (this.minDate) {
            this.dateOptions.minDate = this.minDate;
        }
        if (this.maxDate) {
            this.dateOptions.maxDate = this.maxDate;
        }
    }


    public selectedDate(value: any, dateInput: any) {

        dateInput.dbStart = new SearchModelType(Utils.formatDateData(value.start, 'yyyy-MM-dd'), Utils.formatDateDataWithDefault(value.start), 'dbStart');

        dateInput.dbEnd = new SearchModelType(Utils.formatDateData(value.end, 'yyyy-MM-dd'),
            Utils.formatDateDataWithDefault(value.end), 'dbEnd');

        this.updateDisplayValue();
        this.onSelect.emit(dateInput);
    }



    public setDefaultDate(value: any, dateInput: any) {

        if (value.start) {
            dateInput.dbStart = new SearchModelType(Utils.formatDateData(value.start, 'yyyy-MM-dd'), Utils.formatDateDataWithDefault(value.start), 'dbStart');
        }

        if (value.end) {
            dateInput.dbEnd = new SearchModelType(Utils.formatDateData(value.end, 'yyyy-MM-dd'),
                Utils.formatDateDataWithDefault(value.end), 'dbEnd');
        }


        this.updateDisplayValue();
        this.onSelect.emit(dateInput);
    }

    ngOnInit() {

        if (!this.dataInput) {
            throw new Error('Date Picker must have a "dataInput" attribute.');
        }
        if (this.defaultInput) {
            const value = {};
            if (this.defaultInput && this.defaultInput.startDate) {
                value['start'] = moment(this.defaultInput.startDate);
            }
            if (this.defaultInput && this.defaultInput.endDate) {
                value['end'] = moment(this.defaultInput.endDate);
            }
            this.setDefaultDate(value, this.dataInput);
        } else if (Utils.isEmpty(this.dataInput) || Utils.isEmpty(this.dataInput.dbStart)) {
            const start = moment().subtract('month', 1).startOf('month');
            const end = moment().subtract('month', 1).endOf('month');

            if (!this.initBlank) {
                this.setNewValue(this.singleDatePickerState ? end : start, end);
            }
        }
        // this.dataInput.dbStart = new SearchModelType(Utils.formatDateData(new Date(), 'yyyy-MM-dd'),
        //     Utils.formatDateDataWithDefault(new Date()), 'dbStart');
        // this.dataInput.dbEnd = new SearchModelType(Utils.formatDateData(new Date(), 'yyyy-MM-dd'),
        //     Utils.formatDateDataWithDefault(new Date()), 'dbEnd');
        // this.updateDisplayValue();
    }

    updateDisplayValue() {

        if (this.dataInput !== undefined && (!Utils.isEmpty(this.dataInput.dbStart))
            && (!Utils.isEmpty(this.dataInput.dbEnd))) {
            if (this.singleDatePickerState) {
                this.displayValue = Utils.formatDateDataWithDefault(this.dataInput.dbStart.desc);
            } else {
                this.displayValue = Utils.formatDateDataWithDefault(this.dataInput.dbStart.desc)
                    + ' - ' + Utils.formatDateDataWithDefault(this.dataInput.dbEnd.desc);
            }
        } else {
            this.displayValue = '';
        }
    }

    calendarCanceled(event: any) {
        this.dataInput.dbStart = null;
        this.dataInput.dbEnd = null;
        this.displayValue = '-';
        // set current date
        // this.dataInput.dbStart = new SearchModelType(Utils.formatDateData(new Date(), 'yyyy-MM-dd'),
        //     Utils.formatDateDataWithDefault(new Date()), 'dbStart');
        // this.dataInput.dbEnd = new SearchModelType(Utils.formatDateData(new Date(), 'yyyy-MM-dd'),
        //     Utils.formatDateDataWithDefault(new Date()), 'dbEnd');
        //   this.setNewValue(this.singleDatePickerState ? moment() : moment().subtract(1, 'month'), moment());
        // this.updateDisplayValue();
        // this.picker.datePicker.val('');
        this.onSelect.emit(this.dataInput);
    }


    calendarApplied(e: any) {
        console.log(e);
        // e.event
        // e.picker
    }



    setNewValue(pStartDate: any, pEndDate: any) {
        // console.log(this.dataInput, pStartDate, pEndDate, new Date(pStartDate));
        //        if (!Utils.isEmpty(this.dataInput)) {
        if (this.dataInput !== undefined) {
            this.dataInput.dbStart = new SearchModelType(Utils.formatDateData(pStartDate, 'yyyy-MM-dd'),
                Utils.formatDateDataWithDefault(pStartDate), 'dbStart');

            this.dataInput.dbEnd = new SearchModelType(Utils.formatDateData(pEndDate, 'yyyy-MM-dd'),
                Utils.formatDateDataWithDefault(pEndDate), 'dbEnd');
        }


        if ((this.picker) && (this.picker.datePicker)) {

            this.picker.datePicker.setStartDate(pStartDate);
            this.picker.datePicker.setEndDate(pEndDate);
        }
        this.updateDisplayValue();
    }

}
