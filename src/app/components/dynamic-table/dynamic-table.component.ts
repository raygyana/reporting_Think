import { Component, OnInit, Input, Output, OnChanges, DoCheck, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TopHeader, MainHeader, SubCatg } from './dynamic-table';
import { topHeaderClass } from './dynamic-table.model';
import { Subject } from 'rxjs/Subject';
import { ProjectUtils } from '../../pages/shared/project-utils';
import { Jsonp } from '@angular/http/src/http';
import { parse } from 'querystring';
declare var $;

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit, OnChanges {

  dtTrigger: Subject<any> = new Subject();
  topheadClass = [
    {
      size: 1,
      class: 'colSpan1'
    }, {
      size: 2,
      class: 'colSpan2'
    }, {
      size: 3,
      class: 'colSpan3'
    }, {
      size: 4,
      class: 'colSpan4'
    }
  ];
  myHeaderClass: string;
  @Input() inputData: Array<any>;
  @Input() reportTitle = '';
  @Input() reportFileName = '';
  @Input() MySearchModel: any = {};

  topHeaderArr: Array<TopHeader> = [];
  columnNames: Array<MainHeader> = [];
  rowData: Array<any> = [];
  // newData: boolean;
  // subCatg: Array<SubCatg> = [];

  ddOptions: any;
  constructor(
    private cdf: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  doTableInit() {
    const reportFileName = this.reportFileName;
    const reportTitle = this.reportTitle;
    this.ddOptions = {

      aaSorting: [],
      aoColumnDefs: [
        { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5] }
      ],
      pagingType: 'simple',
      dom: 'Blfrtip',
      language: {
        infoEmpty: 'No entries to show',
        emptyTable: 'No data available with respect to your request',
        zeroRecords: 'No further records for display',
        paginate: {
          first: '<i class="fa fa-backward" aria-hidden="true"></i>',
          last: '<i class="fa fa-forward" aria-hidden="true"></i>',
          next: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
          previous: '<i class="fa fa-caret-left" aria-hidden="true"></i>'
        },
        buttons: {
          colvis: '<i class="fa fa-bars download_class"></i>'
        }
      },
      buttons: [

        // {
        //   extend: 'colvis',
        //   text: '<i class="fa fa-bars"></i>',
        //   titleAttr: 'PDF'
        // },
        {
          extend: 'collection',
          text: '<i class="fa fa-cloud-download"></i>',
          titleAttr: 'Export',
          buttons: [
            {
              extend: 'csv',
              footer: true,
              title: reportTitle,
              filename: function () {
                return ProjectUtils.downloadfileName(reportFileName || 'csvFile');
              }
            }
            // {
            //   extend: 'excel',
            //   footer: true,
            //   title: reportTitle,
            //   filename: function () {
            //     return ProjectUtils.downloadfileName(reportFileName || 'excelFile');
            //   }
            // },
            // {
            //   extend: 'pdf',
            //   footer: true,
            //   title: reportTitle,
            //   filename: function () {
            //     return ProjectUtils.downloadfileName(reportFileName || 'pdfFile');
            //   }
            // }, {
            //   extend: 'print',
            //   footer: true,
            //   title: reportTitle,
            // },
            // {
            //   extend: 'copy',
            //   footer: true,
            //   title: reportTitle,
            // }
          ]
        }
      ]
    };

  }

  createTable() {
    this.doTableInit();
    $('#dynamicTable').DataTable(
      this.ddOptions
    );
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log('SimpleChanges', changes);

    let showTime = 10;
    if (this.inputData) {
      showTime = this.inputData.length / 10;
      if (ProjectUtils.isEmpty(this.inputData)) {
        console.log(this.MySearchModel);

        let firstValue: any, secondValue: any;
        if (!ProjectUtils.isEmpty(this.MySearchModel.currMonth)) {
          firstValue = this.MySearchModel.currMonth[0].desc.toString() + '-' + this.MySearchModel.currYear[0].desc.toString();
        }

        if (!ProjectUtils.isEmpty(this.MySearchModel.prevMonth)) {
          secondValue = this.MySearchModel.prevMonth[0].desc.toString() + '-' + this.MySearchModel.prevYear[0].desc.toString();
        }


        console.log(firstValue, 'SimpleChanges');
        let ocID = [];
        this.MySearchModel.ocID.forEach((item) => {
          ocID.push(item.desc)
        })
        console.log(ocID);
        console.log(secondValue);
        let obj: any = `[{
        "category": "No Record Found",
        "name": "No Record Found",
        "${firstValue}" : "No Record Found",
        "${firstValue}" : "No Record Found",
        "${secondValue}" : "No Record Found",
        "${secondValue}" : "No Record Found"}]`;

        obj = JSON.parse(obj);

        console.log(obj)
        obj.length = ocID.length;
        ocID.forEach((item, index) => {
          obj[index] = Object.assign({}, obj[0], { category: item }); //   item
        })

        console.log(obj);
        //   const obj = {
        //     `firstValue` : "206.15",
        //     'Feb-16:ROW': "1325.79",
        //     'Jan-16:NA': "5583.41",
        //     'Jan-16:ROW': "2901.29",
        //     'category': "Online Only",
        //     'name': "American Biology Teacher"
        // };
        this.inputData = obj;
      }
      const toSum = [];
      Object.keys(this.inputData[0])
        .forEach((item) => {
          if (item.includes(':')) {
            toSum.push(item)
          }

        })
      const keys = ['category'];
      const labelCol = 'category';
      const labelAdd = 'Sub Total';
      const grandTotalLabel = '';
      this.inputData = ProjectUtils.mySumFunctionWithOutBold(this.inputData, toSum,
        labelCol, labelAdd, grandTotalLabel,
        keys, false);

      this.CreateColumns(this.inputData);
      setTimeout(() => {
        this.createTable();
        this.cdf.detectChanges();
      }, showTime || 10);

    }

  }



  findSubCatgRowSpan() {

  }


  CreateColumns(myData: any) {
    let obj = myData[0];
    let topHeaderArr = [];
    let rowSpanCount: number = 1;
    let oneCountry: string;
    let SecHeaderArr = [];
    let topSpanCount = 0;
    // const obj = {
    //   'Feb-16:NA': "206.15",
    //   'Feb-16:ROW': "1325.79",
    //   'Jan-16:NA': "5583.41",
    //   'Jan-16:ROW': "2901.29",
    //   'category': "Online Only",
    //   'name': "American Biology Teacher"
    // };

    const keys = Object.keys(obj);

    keys.forEach((item) => {
      const headers = item.split(':');
      if (headers.length === 1) {
        topSpanCount++;
        SecHeaderArr.push({
          display: headers[0],
          propertyName: item,
          colClass: ' comparisonCellRightBorder '
        });
      } else {
        if (oneCountry !== headers[1]) {
          rowSpanCount += 1;
        }
        oneCountry = headers[1];

        topHeaderArr.push(headers[0]);
        SecHeaderArr.push({
          display: headers[1].split(']')[0],
          propertyName: item,
          colClass: ' comparisonCellRightBorder '
        });
      }


    });
    topHeaderArr = Array.from(new Set(topHeaderArr));
    rowSpanCount /= 3;
    topHeaderArr = topHeaderArr.map((item) => {
      return {
        spanSize: rowSpanCount,
        display: item.split('[')[1]
      }
    })

    topHeaderArr = [{
      spanSize: topSpanCount,
      display: ''
    }].concat(topHeaderArr)

    this.topHeaderArr = topHeaderArr;
    console.log('topHeaderArr', topHeaderArr);
    console.log('SecHeaderArr ', SecHeaderArr);
    console.log('rowSpanCount', rowSpanCount)
    this.columnNames = SecHeaderArr;
    this.columnNames = this.columnNames.map((item) => {
      return {
        display: item.display.toUpperCase(),
        propertyName: item.propertyName
      }
    })

    this.myHeaderClass = this.topheadClass.find((item) => {
      return item.size === this.topHeaderArr[0].spanSize
    }).class || 'colSpan2';
    this.rowData = myData;
  }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }

  getTopHeaderClass(index: number) {
    if (index === 1) {
      console.log('index', index, 'retClass - comparisonCellRightBorder firstColSpanTopHead');
      return ' comparisonCellRightBorder firstColSpanTopHead ';
    } else if (index === 2) {
      console.log('index', index, 'retClass - otherComparisonTH firstColSpanTopHead ');
      return ' otherComparisonTH firstColSpanTopHead ';
    }
  }
  getBottomHeaderClass(index: number) {
    const totLen = this.columnNames.length;
    const lastCols = (totLen - this.topHeaderArr[0].spanSize) / 2;
    const changeCols = totLen - lastCols;
    let retClass = '';
    if ((index > 2) && (index <= (totLen - lastCols - 1))) {
      retClass += ' headBorderColor ';
    }
    if (index >= changeCols) {
      retClass += ' otherComparisonTH';
    }
    if (index === (totLen - 1)) {
      retClass += ' comparisonCellRightBorder ';
    }
    if (index === (totLen - lastCols - 1)) {
      retClass += ' comparisonCellRightBorder ';
    }
    console.log('totLen', totLen, 'lastCols', lastCols, 'index', index, 'changeCols', changeCols, 'retClass', retClass);

    return retClass;
  }

  getColumnClass(index: number, rowIndex: number) {
    const rowLen = this.rowData.length;
    const colLen = this.columnNames.length;
    console.log('rowLen', rowLen, 'rowIndex', rowIndex, 'colLen', colLen, 'index', index);

    const lastCols = (colLen - this.topHeaderArr[0].spanSize) / 2;
    const changeCols = colLen - lastCols;
    let retClass = '';
    if (index === colLen - 1) {
      retClass += ' comparisonCellRightBorder ';
    }
    if (index === (colLen - lastCols - 1)) {
      retClass += ' comparisonCellRightBorder ';
    }
    if (rowIndex === (rowLen - 1)) {
      retClass += ' comparisonCellBottomBorder ';
    }
    // ''
    return retClass;
  }



}
