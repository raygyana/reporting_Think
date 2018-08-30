import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ProjectUtils, Constants } from '../../../shared';
import { Logger } from '../../../../core/logger/logger';
import { StatsTabService } from './stats-tab.service';

@Component({
      selector: 'app-stats-tab',
      templateUrl: './stats-tab.component.html',
      styleUrls: ['./stats-tab.component.css'],
      providers: [StatsTabService]
})
export class StatsTabComponent extends BaseComponent implements OnInit {
      statsData: any;
      constructor(private statsTabService: StatsTabService,
            private _logger: Logger,
            protected loaderService: LoaderService) {
            super(loaderService)
      }

      getLoaderName(): string {
            return 'stats-tab';
      }

      ngOnInit() {
            this.getStatsTabData();
      }

      getStatsTabData() {
            this.showLoader();
            let body = '';
            body += this.statsTabService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());

            this.statsTabService.getData(body).subscribe(data => {
                  // console.log(data);
                  this.statsData = data;
                  // console.log(this.statsData);
                  this.hideLoader();
            }, err => {
                  this._logger.error('StatsTabComponent', 'loadData', 'Something went wrong!');
                  this.hideLoader();
            });
      }
      onLinkClicked() {
            ProjectUtils.downloadGET(Constants.THK_STATS_DOWNLOAD + ProjectUtils.getClientCode());
            // ProjectUtils.downloadGET()
      }
}
