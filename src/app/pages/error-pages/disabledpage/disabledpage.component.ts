import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { MyClientAuthGuard } from '../../../core';

@Component({
  selector: 'app-disabledpage',
  templateUrl: './disabledpage.component.html',
  styleUrls: ['./disabledpage.component.css']
})
export class DisabledpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


export const DISABLED_PATH_ROUTE: Route = {
  path: 'disabledPath',
  component: DisabledpageComponent,
  canActivate: [MyClientAuthGuard]
}
