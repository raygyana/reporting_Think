import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProjectUtils } from 'app/pages/shared/project-utils';
import { DuplicateCreditNoteSearchModel } from '../duplicate-credit-note-search.model';
import { DatePipe } from '@angular/common';

declare var moment;

@Component({
  selector: 'app-duplicate-credit-note-print-view',
  templateUrl: './duplicate-credit-note-print-view.component.html',
  styleUrls: ['./duplicate-credit-note-print-view.component.css']
})
export class DuplicateCreditNotePrintViewComponent implements OnInit, OnChanges {

  @Input() data: Array<any>
  @Input() searchModel: DuplicateCreditNoteSearchModel

  dataToShow: Array<any>;

  singleDetails: any;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {

  }

  ngOnChanges() {

    if (Array.isArray(this.data)) {

      this.transformDate();
      const { singleObj, dataToShow } = ProjectUtils.arrDivideInSubArray(this.data, 7);

      this.singleDetails = singleObj;
      this.dataToShow = dataToShow;


    }

  }


  transformDate() {
    this.data.forEach((item) => {
      item['invoice_date'] = moment(item['invoice_date']).format('MMM Do YY');
      item['sub_start_date'] = moment(item['sub_start_date']).format('MMM Do YY');
      item['sub_end_date'] = moment(item['sub_end_date']).format('MMM Do YY');
    });
  }

}
