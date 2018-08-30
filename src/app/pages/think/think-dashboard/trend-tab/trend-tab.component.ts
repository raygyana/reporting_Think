import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ProjectUtils, Constants } from '../../../shared';
import { Logger } from '../../../../core/logger/logger';
import { TrendTabService } from './trend-tab.service';

@Component({
	selector: 'app-trend-tab',
	templateUrl: './trend-tab.component.html',
	styleUrls: ['./trend-tab.component.css'],
	providers: [TrendTabService]
})
export class TrendTabComponent extends BaseComponent implements OnInit {
	trendData: any;
	constructor(private trendTabService: TrendTabService,
		private _logger: Logger,
		protected loaderService: LoaderService) {
		super(loaderService)
	}

	getLoaderName(): string {
		return 'trend-tab';
	}

	ngOnInit() {
		this.getTrendTabData();
	}

	getTrendTabData() {
		this.showLoader();
		let body = '';
		body += this.trendTabService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());

		this.trendTabService.getData(body).subscribe(data => {
			//	console.log(data);
			this.trendData = data;
			//	console.log(this.trendData);
			this.hideLoader();
		}, err => {
			this._logger.error('TrendTabComponent', 'loadData', 'Something went wrong!');
			this.hideLoader();
		});
	}

	onLinkClicked() {

		ProjectUtils.downloadGET(Constants.THK_TREND_DOWNLOAD + ProjectUtils.getClientCode());
	}

}
