import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MyChartService } from './my-charts.service';
import { MyChartModel } from './my-charts.model';
import { ProjectUtils } from '../../pages/shared';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-my-charts',
  templateUrl: './my-charts.component.html',
  styleUrls: ['./my-charts.component.css']
})
export class MyChartsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chartOptions: any;
  @Input() classes = 'highChartDefalutCSS'
  id: string;

  constructor(
    private myChartService: MyChartService
  ) {
    this.myChartService._register(this);
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc['chartOptions']) {
      setTimeout(() => {
        this.myChartService.createChart(this);
      }, 100);
    }
  }

  ngOnInit() {
    this.errorChecking();
  }

  ngOnDestroy() {
    this.myChartService._unregister(this);
  }

  errorChecking() {

  }


}
