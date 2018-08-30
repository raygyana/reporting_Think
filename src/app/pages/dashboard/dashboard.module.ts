import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
// import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { RecordTableComponent } from '../record-table/record-table.component';
import { CoreModule } from '../../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { ComponentsModule } from '../../components';
import { DashboardService } from './dashboard.service';


@NgModule({
    imports: [
        ComponentsModule,
        CommonModule,
        FormsModule,
        routing,
        CoreModule,
        DataTablesModule
    ],
    declarations: [
        DashboardComponent,
        // AccountSummaryComponent,
        RecordTableComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }
