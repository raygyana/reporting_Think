import { Injectable } from '@angular/core';


declare var Highcharts;

export class HighChartService {

      constructor() { }

      createMyChart(id: string, option: any): any {
            return Highcharts.chart(id, option);
      }

      getOptions() {
            return Highcharts.getOptions();
      }

      Highcharts(): any {
            return Highcharts;
      }


      setGridLight() {
            Highcharts.createElement('link', {
                  href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
                  rel: 'stylesheet',
                  type: 'text/css'
            }, null, document.getElementsByTagName('head')[0]);

            Highcharts['theme'] = {
                  colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
                        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                  chart: {
                        backgroundColor: null,
                        style: {
                              fontFamily: 'Dosis, sans-serif'
                        }
                  },
                  title: {
                        style: {
                              fontSize: '16px',
                              fontWeight: 'bold',
                              textTransform: 'uppercase'
                        }
                  },
                  tooltip: {
                        borderWidth: 0,
                        backgroundColor: 'rgba(219,219,216,0.6)',
                        shadow: false
                  },
                  legend: {
                        itemStyle: {
                              fontWeight: 'bold',
                              fontSize: '13px'
                        }
                  },
                  xAxis: {
                        gridLineWidth: 1,
                        labels: {
                              style: {
                                    fontSize: '12px'
                              }
                        }
                  },
                  yAxis: {
                        minorTickInterval: 'auto',
                        title: {
                              style: {
                                    textTransform: 'uppercase'
                              }
                        },
                        labels: {
                              style: {
                                    fontSize: '12px'
                              }
                        }
                  },
                  plotOptions: {
                        candlestick: {
                              lineColor: '#404048'
                        }
                  },


                  // General
                  // background2: '#F0F0EA'

            };
            Highcharts.setOptions(Highcharts.theme);
      }





      setGridLight2() {
            Highcharts['theme'] = {
                  title: {
                        text: 'Combination chart'
                  },
                  xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
                  },
                  labels: {
                        items: [{
                              html: 'Total fruit consumption',
                              style: {
                                    left: '50px',
                                    top: '18px',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                              }
                        }]
                  },







                  series: [{
                        type: 'column',
                        name: 'Jane',
                        data: [3, 2, 1, 3, 4]
                  }, {
                        type: 'column',
                        name: 'John',
                        data: [2, 3, 5, 7, 6]
                  }, {
                        type: 'column',
                        name: 'Joe',
                        data: [4, 3, 3, 9, 0]
                  }, {
                        type: 'spline',
                        name: 'Average',
                        data: [3, 2.67, 3, 6.33, 3.33],
                        marker: {
                              lineWidth: 2,
                              lineColor: Highcharts.getOptions().colors[3],
                              fillColor: 'white'
                        }
                  }, {
                        type: 'pie',
                        name: 'Total consumption',
                        data: [{
                              name: 'Jane',
                              y: 13,
                              color: Highcharts.getOptions().colors[0] // Jane's color
                        }, {
                              name: 'John',
                              y: 23,
                              color: Highcharts.getOptions().colors[1] // John's color
                        }, {
                              name: 'Joe',
                              y: 19,
                              color: Highcharts.getOptions().colors[2] // Joe's color
                        }],
                        center: [100, 80],
                        size: 100,
                        showInLegend: false,
                        dataLabels: {
                              enabled: false
                        }
                  }]
            };
      }


}
