import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProjectUtils } from 'app/pages/shared/project-utils';
import { DuplicateInvoiceSearchModel } from '../duplicate-invoice-search.model';


declare var moment;

@Component({
  selector: 'app-duplicate-invoice-print-view',
  templateUrl: './duplicate-invoice-print-view.component.html',
  styleUrls: ['./duplicate-invoice-print-view.component.css']
})
export class DuplicateInvoicePrintViewComponent implements OnInit, OnChanges {

  @Input() data: Array<any>
  @Input() searchModel: DuplicateInvoiceSearchModel;
  dataToShow: Array<any>;
  singleDetails: any;

  constructor(
  ) { }

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
      item['due_date'] = moment(item['due_date']).format('MMM Do YY');
      item['sub_start_date'] = moment(item['sub_start_date']).format('MMM Do YY');
      item['sub_end_date'] = moment(item['sub_end_date']).format('MMM Do YY');
    });
  }

  //     { { singleDetails ?.} }
  //     { { singleDetails ?.} }
  //     { { singleDetails ?.} }
  //     { { singleDetails ?.} }
  //   }

  //   [{
  //     "bill_to_customer_id": "136352",
  //     "publisher_website": "www.pharmpress.com",
  //     "vat_id": "233 0296 92",
  //     "tax_id_number": null,
  //     "quantity": "1",
  //     "order_id": "523224",
  // ]

}
