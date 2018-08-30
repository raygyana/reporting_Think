import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountSummaryService } from './account-summary.service';
import { AccountSummaryVO } from './account-summary.vo';
import { BaseComponent } from '../../../core/base/base.component';
import { LoaderService } from '../../../core/loader/loader.service';

@Component({
    selector: 'app-account-summary',
    templateUrl: './account-summary.component.html',
    styleUrls: ['./account-summary.component.css'],
    providers: [AccountSummaryService]
})
export class AccountSummaryComponent extends BaseComponent implements OnInit, OnDestroy {
    private req: any;
    accountSummaryVO: AccountSummaryVO[] = [];
    records = new Array();
    totalValue: number;
    constructor(protected loaderService: LoaderService,
        private _accountSummaryService: AccountSummaryService) {
        super(loaderService);
    }

    getLoaderName(): string {
        return 'account-summary';
    }
    ngOnInit() {
        this.showLoader();
        const body = '';
        this.req = this._accountSummaryService.getData(body).subscribe(data => {
            console.log('Here..............................');
            console.log(data);
            // this.accountSummaryVO = data as AccountSummaryVO[];
            this.records = data['data'];
            console.log('records_________', this.records);
            this.totalValue = 0;
            for (const objKey of this.records) {
                console.log(objKey);
                // console.log(objKey.value);
                this.totalValue += +objKey.value;

            }
            console.log(this.totalValue);

            console.log(this.accountSummaryVO);
            this.hideLoader();
        },
            err => {
                console.log('Somethin went wrong!!');
                this.hideLoader();
            })
    }



    xtBaseOnDestroy() {
        this.req.unsubscribe();
    }

}
