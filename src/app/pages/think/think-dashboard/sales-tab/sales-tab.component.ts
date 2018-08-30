import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ProjectUtils, Constants } from '../../../shared';
import { Logger } from '../../../../core/logger/logger';
import { SalesTabService } from './sales-tab.service';

@Component({
      selector: 'app-sales-tab',
      templateUrl: './sales-tab.component.html',
      styleUrls: ['./sales-tab.component.css'],
      providers: [SalesTabService]
})
export class SalesTabComponent extends BaseComponent implements OnInit {
      salesTabData: any;
      constructor(private salesTabService: SalesTabService,
            private _logger: Logger,
            protected loaderService: LoaderService) {
            super(loaderService)

      }
      getLoaderName(): string {
            return 'sales-tab';
      }


      ngOnInit() {
            this.getSalesTabData();
      }

      getSalesTabData() {
            this.showLoader();
            let body = '';
            body += this.salesTabService.setParamValue(body, 'clientID', ProjectUtils.getClientCode());

            this.salesTabService.getData(body).subscribe(data => {
                  console.log(data);
                  this.salesTabData = data;
                  console.log(this.salesTabData);
                  this.hideLoader();
            }, err => {
                  this._logger.error('SalesTabComponent', 'loadData', 'Something went wrong!');
                  this.hideLoader();
            });
      }


      onLinkClicked() {

            ProjectUtils.downloadGET(Constants.THK_SALES_DOWNLOAD + ProjectUtils.getClientCode());
      }
}
