import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { RecordTableComponent } from '../record-table/record-table.component';
import { Constants } from '../shared/constant';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            // { path: 'treeview', component: TreeViewComponent }
        ]
        // }, {
        //     path: 'library',
        //     component: LibraryDashboardComponent
        // },
        // {
        //     path: 'ipdetails',
        //     component: RecordTableComponent,
        //     data: [{ isMore: true },
        //     { serviceURL: Constants.HIGHEST_IP_DETAIL_URL },
        //     { messageString: Constants.HIGHEST_IP_DETAILS_MESSAGE }]
        // },
        // {
        //     path: 'unidentifiedip',
        //     component: RecordTableComponent,
        //     data: [{ isMore: true },
        //     { serviceURL: Constants.UNIDENTIFIED_IP_DETAIL_URL },
        //     { messageString: Constants.UNIDENTIFIED_IP_DETAIL_MESSAGE }]
        // },
        // {
        //     path: 'licencedenial',
        //     component: RecordTableComponent,
        //     data: [{ isMore: true },
        //     { serviceURL: Constants.LICENCE_DENIAL_URL },
        //     { messageString: Constants.LICENCE_DENIAL_MESSAGE }]
        // },
        // {
        //     path: 'analyticsincrease',
        //     component: AnalyticsIncreaseComponent,
        //     data: [{
        //         isIncreaseMore: true,
        //         isMore: true
        //     }]
        // },
        // {
        //     path: 'analyticsdecrease',
        //     component: AnalyticsIncreaseComponent,
        //     data: [{ isDecreaseMore: true }]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
