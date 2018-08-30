import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { DataTablesModule } from 'angular-datatables';
// import { ChartModule } from 'angular-highcharts';
import { CoreModule } from '../../../core/core.module';
import { ComponentsModule } from '../../../components/components.module';

import { SalesTabComponent } from './sales-tab/sales-tab.component';
import { TrendTabComponent } from './trend-tab/trend-tab.component';
import { StatsTabComponent } from './stats-tab/stats-tab.component';
import { AnnualSalesOrderComponent } from './annual-sales-order/annual-sales-order.component';
import { JournalSalesComponent } from './journal-sales/journal-sales.component';
import { RegionSalesComponent } from './region-sales/region-sales.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		// ChartModule,
		CoreModule,
		ComponentsModule
	],
	declarations: [
		SalesTabComponent,
		TrendTabComponent,
		StatsTabComponent,
		AnnualSalesOrderComponent,
		JournalSalesComponent,
		RegionSalesComponent
	],
	exports: [SalesTabComponent,
		TrendTabComponent,
		StatsTabComponent,
		AnnualSalesOrderComponent,
		JournalSalesComponent,
		RegionSalesComponent],
	providers: []
})

export class ThinkDashboardModule { }
