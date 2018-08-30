import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, TemplateRef, ElementRef } from '@angular/core';
import { DtWithComponentService } from './dt-with-component.service';
import { Utils } from '../../pages/shared';
@Component({
  selector: 'app-dt-with-component',
  templateUrl: './dt-with-component.component.html',
  styleUrls: ['./dt-with-component.component.css'],
  providers: [
    DtWithComponentService
  ]
})
export class DtWithComponentComponent implements OnInit, OnChanges {

  public tableClass = 'table row-border table-hover table-striped table-bordered';
  @Input() data: Array<any>;
  tableData: Array<any> = [];
  myDtOptions: any = {};


  colKeys: Array<string> = [];
  constructor(
    private dtWithComponentService: DtWithComponentService,
    private cdf: ChangeDetectorRef
  ) {
    this.dtWithComponentService.getMyDtOption(this.myDtOptions);
  }

  ngOnInit() {
  }

  ngOnChanges(sc: SimpleChanges) {
    const myData = sc['data'].currentValue;

    this.fetchKeys();
  }


  fetchKeys() {
    this.cdf.detectChanges();
    Utils.isNotEmpty(this.data)
      .then(() => {
        Object.keys(this.data[0])
          .forEach((k) => {
            this.colKeys.push(k)
          });

        //  this.colKeys.splice(this.colKeys.indexOf('jour'), 1)

        this.convertDataAccordingToMe();
      })
      .catch(() => {
        console.log('DtWithComponentComponent Data is Empty')
      })
  }

  convertDataAccordingToMe() {

    this.tableData = []
    this.data.forEach((item, index) => {
      this.tableData.push(Utils.assignNewCopy(item));
      Object.keys(item)
        .forEach((key) => {

          if (item[key] instanceof TemplateRef) {
            this.tableData[index][key] = {
              isNotComponent: false,
              value: item[key]
            }
          } else {
            this.tableData[index][key] = {
              isNotComponent: true,
              value: item[key]
            }
          }

        })

    })

    console.log('tableData', this.tableData)
  }



}
