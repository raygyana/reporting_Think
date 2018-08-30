import { Injectable } from '@angular/core';
import { Constants } from '../../../shared/constant';
import { BaseService } from '../../../../core/base/base.service';
import { ProjectUtils } from '../../../shared/project-utils';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class InventoryStockListService extends BaseService {

    constructor(
        protected httpService: HttpService
    ) {
        super(httpService)
    }

    getServiceURL(): string {
        return Constants.TK_INVENTORY_STOCK_LIST_REPORT_URL;
    }

    addColumnsOption(dtOptions: any) {
        dtOptions['columns'] = [
            {
                'data': 'invtId',
                'title': 'Inv.ID'
            }, {
                'data': 'description',
                'title': 'Description'
            },
            {
                'data': 'inventoryCode',
                'title': 'Code'
            },
            // {
            //     'data': 'productTitle',
            //     'title': 'Product Title'
            // },
            {
                'data': 'inStock',
                'title': 'In Stock'
            }, {
                'data': 'customerOrder',
                'title': 'Customer Order'
            }, {
                'data': 'customerBackOrder',
                'title': 'Customer Back order'
            }, {
                'data': 'orderPoint',
                'title': 'Order Point'
            }, {
                'data': 'lastIssueDate',
                'title': 'Last Issue date',
                'type': 'datetime',
                'render': this.dateFormInDatatable
            }, {
                'data': 'active',
                'title': 'Active'
            }
        ];
    }
}

