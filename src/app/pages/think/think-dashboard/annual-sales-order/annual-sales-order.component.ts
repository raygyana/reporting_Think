import { Component, OnInit, AfterViewInit } from '@angular/core';

import {
      BaseComponent, LoaderService,
      Logger, HighChartService
} from '../../../../core';
import { ProjectUtils, Constants } from '../../../shared';
import { AnnualSalesOrderService } from './annual-sales-order.service';

@Component({
      selector: 'app-annual-sales-order',
      templateUrl: './annual-sales-order.component.html',
      styleUrls: ['./annual-sales-order.component.css'],
      providers: [AnnualSalesOrderService]
})

export class AnnualSalesOrderComponent extends BaseComponent implements OnInit, AfterViewInit {

      annualSalesData: any;
      drillDownData: any;
      chart: any;
      selectYear: string = '';
      annualSalesChart: any;
      defaultTitle = 'Annual Sales Order Revenue (for last 20 years)';
      options: any;
      isvisible: boolean = true;
      constructor(
            private annualSalesOrderService: AnnualSalesOrderService,
            private _logger: Logger,
            protected loaderService: LoaderService,
            private highChartService: HighChartService,
            //     private downloadFileService: DownloadFileService
      ) {
            super(loaderService);

      }
      ngAfterViewInit() {

      }
      getLoaderName(): string {
            return 'annual-sales-order';
      }

      ngOnInit() {
            this.getAnnualSalesData();
      }

      onDownloadClick() {
            // const body = [
            //       {
            //             key: 'clientID',
            //             value: ProjectUtils.getClientCode()
            //       }, {

            //             key: 'volumeYear',
            //             value: this.selectYear
            //       }
            // ];
            // const fileDetails = {
            //       fileName: 'abc',
            //       fileType: 'xlsx'
            // }
            // this.downloadFileService.downFilebyPost('http://api.mps-think.com/Compass-API/SearchSalesReport/annualSaleDownlaodPOST', body, fileDetails);
            ProjectUtils.downloadGET(Constants.THK_ANNUAL_SALE_DOWNLOAD + '?clientID=' + ProjectUtils.getClientCode() + '&volumeYear=' + this.selectYear)


            //  window.open('https://api.mps-think.com/Compass-API/SearchSalesReport/annualSaleDownlaod?clientID=' + ProjectUtils.getClientCode() + '&volumeYear=' + this.selectYear)
            // const a = document.createElement('a');
            // const url = 'https://alpha.mpsinsight.com/Compass-API/SearchSalesReport/annualSaleDownlaod?clientID=' + ProjectUtils.getClientCode() + '&volumeYear=' + this.selectYear;
            // 
            // a.href = window.URL.createObjectURL(url);
            // a.download = 'abc.csv';
            // document.body.appendChild(a);
            // a.click();
            // document.body.removeChild(a);


      }





      getAnnualSalesData() {
            this.showLoader();
            let body = '';
            body += this.annualSalesOrderService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
            this.annualSalesOrderService.getData(body).subscribe(data => {

                  this.processData(data);
                  console.log('this.annualSalesData', ProjectUtils.sorting(this.annualSalesData, 'name', 'dsc'));

                  this.hideLoader();
            }, err => {
                  this._logger.error('AnnualSalesOrderComponent', 'loadData', 'Something went wrong!');
                  this.hideLoader();
            });
      }

      processData(objAnnualSalesData: any) {
            this.annualSalesData = [];
            this.drillDownData = [];

            objAnnualSalesData.forEach((item, index) => {

                  this.annualSalesData.push({
                        name: item.year,
                        y: item.yeartotal,
                        drilldown: item.year
                  });

                  this.drillDownData.push({
                        name: item.year,
                        id: item.year,
                        data: []
                  });

                  if (!ProjectUtils.isEmpty(item.monthData)) {
                        item.monthData.forEach((item2) => {
                              this.drillDownData[index].data.push([
                                    item2.month,
                                    parseFloat(item2.monthtotal)
                              ]);
                        });
                  }

            })
            console.log(' this.annualSalesData', this.annualSalesData.count);
            this.chart1Setting();
      }

      chart1Setting() {
            const self = this;
            console.log(self.drillDownData);
            const myChartOptions = {
                  chart: {
                        type: 'column',
                        events: {
                              drilldown: function (e) {
                                    this.xAxis[0].setTitle({ text: 'Year - ' + e.point.name });
                                    self.annualSalesChart.setTitle({ text: 'Annual Sales Order Revenue for Year - ' + e.point.name });
                                    self.isvisible = false;
                                    // self.annualSalesChart.setTitle({ text: self.defaultTitle + ' - ' + e.point.name });
                              },
                              drillup: function (e) {
                                    e.seriesOptions.data = ProjectUtils.sorting(e.seriesOptions.data, 'name', 'asc');
                                    this.xAxis[0].setTitle({ text: 'Year' });
                                    self.annualSalesChart.setTitle({ text: self.defaultTitle });
                                    self.isvisible = true;
                                    //                                    myChartOptions.setTitle({ text: 'test' });
                              }
                        }
                  },
                  title: {
                        //text: this.defaultTitle
                        text: 'Annual Sales Order Revenue (for last' + this.annualSalesData.length + ' years)'
                  },
                  subtitle: {
                        text: ''
                        // text: 'Click the columns to view '
                  },
                  credits: {
                        enabled: false
                  },

                  xAxis: {
                        type: 'category',
                        title: {
                              text: 'Year '
                        }
                  },
                  yAxis: {
                        title: {
                              text: 'Revenue '
                        }

                  },
                  lang: {
                        decimalPoint: '.',
                        thousandsSep: ','
                  },

                  legend: {
                        enabled: false
                  },
                  plotOptions: {
                        series: {
                              dataLabels: {
                                    enabled: true,
                                    formatter: function () {
                                          return self.numberFormat(this.y);
                                    }
                              }
                        }
                  },

                  tooltip: {
                        formatter: function () {
                              return '<span style="font-size:14px; color:#FFF">' + this.series.name + ' </span>' +
                                    '<span style="font-size:14px; color:#FFF;">' + this.point.name + '</span> <br> <span style="font-size:22px; text-transform:uppercase; alignment-baseline:central;  color:#FFF;"  >' + self.numberFormat(this.y) + '</span> <br/>';
                        }
                  },
                  exporting: {
                        buttons: {
                              contextButton: {
                                    enabled: false
                              },
                              toggle: {
                                    text: 'Select range',
                                    menuItems: [{
                                          text: '0-5',
                                          onclick: function () {
                                                this.xAxis[0].setExtremes(0, 5);

                                          }
                                    }, {
                                          text: '5-10',
                                          onclick: function () {
                                                this.xAxis[0].setExtremes(5, 10);

                                          }
                                    }]
                              }
                        }
                  },

                  series: [{
                        name: 'Annual Sales',
                        data: this.annualSalesData
                  }],
                  drilldown: {
                        series: this.drillDownData,
                        drillUpButton: {
                              position: {
                                    y: -35,
                                    x: -10
                              }
                        }
                  }
            }


            this.annualSalesChart = this.highChartService.createMyChart('AnnualSalesOrderCharts', myChartOptions);

      }

}
