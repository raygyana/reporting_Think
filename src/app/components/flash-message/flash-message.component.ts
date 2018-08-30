import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlashMessageService, AlertDetails, AlertI } from './flash-message.service';


@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit, OnDestroy {

  @Input() basicSetting: AlertDetails;

  visible: boolean;
  alertClass: string
  msg: string;


  constructor(
    private fms: FlashMessageService
  ) { }

  ngOnInit() {


    this.errorChecking();
    this.fms._register(this);
  }


  ngOnDestroy() {
    this.fms._unregister(this);
  }


  errorChecking() {
    if (!this.basicSetting.id) {
      throw new Error('Flash message should have id');
    }

    if (!this.basicSetting.name) {
      console.warn('Flash message should have name');
    }
  }


}
