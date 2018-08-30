import {
  Component, OnInit, Input,
  OnChanges, EventEmitter, Output
} from '@angular/core';
import { ProjectUtils } from '../../pages/shared';
import { BaseComponent } from '../../core';

export interface ReportDetailsI {
  reportFileName?: string;
  reportTitle?: string;
}

declare var $;


@Component({
  selector: 'app-dynamic-datatable',
  templateUrl: './dynamic-datatable.component.html',
  styleUrls: ['./dynamic-datatable.component.css']
})
export class DynamicDatatableComponent implements OnInit, OnChanges {

  @Input() tableData: Array<any>;
  @Input() tableColumns: Array<any>;
  @Input() ddOptions: any;
  @Input() reportDetails: ReportDetailsI;
  @Input() baseComponent: BaseComponent;

  @Output() processComplete: EventEmitter<any> = new EventEmitter();

  datatable: any;

  firedDataTableOnce = false;

  public tableClass = 'table row-border table-hover table-striped table-bordered';

  columnNames: Array<any> = [];

  rowData: Array<any>;
  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {

    if (this.tableData) {

      if (this.firedDataTableOnce === false) {
        this.rowData = [this.tableData[0]];
        if (this.tableColumns) {
          this.columnNames = this.tableColumns;
        } else {
          this.createColumn();
        }
      } else {
        this.addData();
      }
    }
  }


  doTableInit() {

    if (this.reportDetails === undefined) {
      this.reportDetails = {};
    }

    if (!this.ddOptions) {
      this.ddOptions = {};
      this.ddOptions = ProjectUtils.doOptionSettingsInsight(this.reportDetails.reportFileName || 'liveReport', this.reportDetails.reportTitle || 'Live Report');
    }

    this.ddOptions['columns'] = this.columnNames;
  }


  createColumn() {


    const singleObj = this.tableData[0];
    const keys = Object.keys(singleObj);

    this.columnNames = keys.map(key => {
      return {
        title: key.split('_').join(' '),
        data: key
      }
    });
  }

  doOnIMReady(event: any) {

    if (this.firedDataTableOnce === false) {
      this.doTableInit();
      this.datatable = $('#dynamicDataTable').DataTable(
        this.ddOptions
      );
      this.firedDataTableOnce = true;
      this.addData();
    } else {
      this.addData();
    }



  }

  addData() {

    this.datatable = this.datatable.clear();
    this.datatable.rows.add(this.tableData);
    this.datatable.draw();

    this.processComplete.emit();
  }


}
