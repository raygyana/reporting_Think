import { Component, OnInit } from '@angular/core';

import { ProjectUtils } from '../../../shared';
import {
	BaseComponent, LoaderService, Logger,
	HighChartService
} from '../../../../core';

import { RegionSalesService } from './region-sales.service';
@Component({
	selector: 'app-region-sales',
	templateUrl: './region-sales.component.html',
	styleUrls: ['./region-sales.component.css'],
	providers: [RegionSalesService]
})
export class RegionSalesComponent extends BaseComponent implements OnInit {
	pieChart2: any;
	regionSalesData: any;
	constructor(private regionSalesService: RegionSalesService,
		private _logger: Logger,
		protected loaderService: LoaderService,
		private highChartService: HighChartService) {
		super(loaderService)

	}

	getLoaderName(): string {
		return 'region-sales';
	}

	ngOnInit() {
		this.getRegionSalesData(new Date().getFullYear().toString());
	}

	getRegionSalesData(pYear: string) {
		this.showLoader();
		let body = '';
		body += this.regionSalesService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());
		body += this.regionSalesService.setParamValue(body, 'year', pYear);
		this.regionSalesService.getData(body).subscribe(data => {
			// console.log(data);
			// this.regionSalesData = data;
			if (!ProjectUtils.isEmpty(data)) {
				this.getProcessData(data);
			}
			// console.log(this.regionSalesData);
			this.hideLoader();
		}, err => {
			this._logger.error('RegionSalesComponent', 'loadData', 'Something went wrong!');
			this.hideLoader();
		});
	}

	getProcessData(objRegionSalesData: any) {
		this.regionSalesData = [];
		for (const item of objRegionSalesData) {
			this.regionSalesData.push([
				item.region, item.count
			]);
		}
		this.pieChart2Setting(objRegionSalesData[0].month, objRegionSalesData[0].year);
	}


	pieChart2Setting(month, year) {
		const chartOption: any = {
			chart: {
				type: 'pie',
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false

			},
			title: {
//				text: 'Sales by Region -'  + month + ' ' + year,
				text: 'Sales by Region - 90 Days',
				align: 'center',
				verticalAlign: 'top'
			},
			tooltip: {
				headerFormat: '<span style="font-size:14px; color:#FFF;">{point.key}</span><br/>',
				pointFormat: '<span style="font-size:14px; alignment-baseline:central;  color:#FFF">{series.name}: {point.percentage:.1f}%</span>'
			},
			credits: {
				enabled: false
			},
			colors: [
				'#4572A7',
				'#B5CA92',
				'#AA4643',
				'#DB843D',
				'#80699B',
				'#3D96AE',
				'#92A8CD',
				'#A47D7C'
			],
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: false,
						distance: -50,
						style: {
							fontWeight: 'bold',
							color: 'white'
						}
					},
					showInLegend: true,
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}

			},

			series: [{
				type: 'pie',
				name: 'Sales',
				innerSize: '50%',
				data: this.regionSalesData
			}]
		};

		this.highChartService.createMyChart('regionSalesChart', chartOption);

	}

}
