import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class IssueListService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_ISSUE_LIST_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'issueId',
                'title': 'Issue ID'
            }, {
                'data': 'ocId',
                'title': 'OC ID'
            }, {
                'data': 'volumeIssueNo',
                'title': 'Volume/Issue No.'
            }, {
                'data': 'issueDate',
                'title': 'Issue Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'closeDate',
                'title': 'Close Date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'status',
                'title': 'Status'
            }
        ];
    }
}

