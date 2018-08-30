import { Component, OnInit } from '@angular/core';
import { ProjectUtils } from '../../../shared';
import { Logger, HighChartService, BaseComponent, LoaderService, MyClientServices } from '../../../../core';
import { JournalSalesService } from './journal-sales.service';

@Component({
	selector: 'app-journal-sales',
	templateUrl: './journal-sales.component.html',
	styleUrls: ['./journal-sales.component.css'],
	providers: [JournalSalesService]
})
export class JournalSalesComponent extends BaseComponent implements OnInit {
	pieChart: any;
	journalSalesData: any;
	constructor(
		private journalSalesService: JournalSalesService,
		private _logger: Logger,
		protected loaderService: LoaderService,
		private highChartService: HighChartService,
		protected myClientServices: MyClientServices) {
		super(loaderService);
		this.currentClient = (!ProjectUtils.isEmpty(this.myClientServices)) ?
			this.myClientServices.getMyClient() : '';
	}

	getLoaderName(): string {
		return 'journal-sales';
	}

	ngOnInit() {
		this.getJournalSalesData(new Date().getFullYear().toString());
	}

	getJournalSalesData(pYear: string) {
		this.showLoader();
		let body = '';
		body += this.journalSalesService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
		body += this.journalSalesService.setParamValue(body, 'year', pYear);
		this.journalSalesService.getData(body).subscribe(data => {
			// console.log(data);
			if (!ProjectUtils.isEmpty(data)) {
				this.getProcessData(data);
			}
			this.hideLoader();
		}, err => {
			this._logger.error('JournalSalesComponent', 'loadData', 'Something went wrong!');
			this.hideLoader();
		});
	}

	getProcessData(objJournalSalesData: any) {
		this.journalSalesData = [];
		for (const item of objJournalSalesData) {
			// console.log(item);
			this.journalSalesData.push({
				name: item.journalAcronym,
				y: item.sale
			});
		}
		let headertext = 'Sales by Journal (Top 10) - 90 Days';
		if (this.currentClient === 'php') {
			headertext = 'Sales for Medicine Complete (Top 10) - 90 Days';
		}
		this.pieChartSetting(objJournalSalesData[0].month, objJournalSalesData[0].year, headertext);
	}

	pieChartSetting(month, year, heading) {
		const myChartOption = {
			chart: {
				type: 'pie',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
			},
			title: {
				text: heading,
			},
			tooltip: {
				headerFormat: '<span style="font-size:14px; color:#FFF;">{point.key}</span><br/>',
				pointFormat: '<span style="font-size:14px; alignment-baseline:central;  color:#FFF">{series.name}: {point.percentage:.1f}%</span>'
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true,
					point: {
						events: {
							legendItemClick: function (e) {
								e.preventDefault();
							}
						}
					}
				}
			},
			series: [{
				name: 'Sales Journal',
				data: this.journalSalesData
			}]
		};


		this.highChartService.createMyChart('journalSalesChart', myChartOption);
	}

}
