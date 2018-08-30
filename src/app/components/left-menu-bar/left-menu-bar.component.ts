import { Component, OnInit, Input } from '@angular/core';
import { LeftMenuBarService } from './left-menu-bar.service';
interface DashBoardI {
  routerLink: string,
  fa: string,
  Home: string
}

@Component({
  selector: 'app-left-menu-bar',
  templateUrl: './left-menu-bar.component.html',
  styleUrls: ['./left-menu-bar.component.css']
})
export class LeftMenuBarComponent implements OnInit {

  @Input() navigationData: Array<any>
  // @Input() dashBoard: any;
  id: string;
  idHash: string;
  constructor(
    private leftMenuBarService: LeftMenuBarService
  ) {
    this.leftMenuBarService._reg(this);
    this.idHash = '#' + this.id;
  }

  ngOnInit() {
  }
  closeOtherCard() {
    let showList: any = document.getElementsByClassName('show');
    showList = Array.from(showList);
    showList.forEach((ele) => {
      ele.classList.remove('show');
    })

  }
}
