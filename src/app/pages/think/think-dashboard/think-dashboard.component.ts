import { Component, OnInit } from '@angular/core';
// import { Chart } from 'angular2-highcharts';
import { ModalModelOptions, ModalService } from '../../../components';
declare var Highcharts

@Component({
	selector: 'app-think-dashboard',
	templateUrl: './think-dashboard.component.html',
	styleUrls: ['./think-dashboard.component.css']
})
export class ThinkDashboardComponent implements OnInit {

	dashboardModalModelOptions: ModalModelOptions;
	constructor(
		private modalService: ModalService
	) {
		const globalOptions = {
			lang: {
				decimalPoint: '.',
				thousandsSep: ','
			}
		};

		Highcharts.setOptions(globalOptions);
		this.createModalPopUp();
	}

	ngOnInit() {
		document.title = 'MPS : Dashboard';
	}


	createModalPopUp() {
		this.dashboardModalModelOptions = new ModalModelOptions();
		this.dashboardModalModelOptions.bodyMessage = `Orders for last 90 days with below combination <br>
		Order Status: Order Placed, Active/Shipping and Complete <br>		
		Order Type: Subscription`;
		this.dashboardModalModelOptions.button2 = 'Ok';
		this.dashboardModalModelOptions.captionHeading = 'Information';
		this.dashboardModalModelOptions.id = 'dashboardInfo';

	}

	dashboardInfoClicked() {
		this.modalService.show(this.dashboardModalModelOptions)
	}
}
