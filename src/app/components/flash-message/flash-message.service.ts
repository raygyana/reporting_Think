import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FlashMessageComponent } from './flash-message.component';

export interface AlertI {
      id: string;
}
export interface AlertDetails {
      name: string;
      id: string;
}
@Injectable()

export class FlashMessageService {

      //     alertInterection: Subject<AlertI> = new Subject();

      // alertClassArray = [
      //       'alert-primary',
      //       'alert-seconda',
      //       'alert-success',
      //       'alert-danger',
      //       'alert-warning',
      //       'alert-info',
      //       'alert-ligh',
      //       'alert-dark'
      // ];




      private customAlerts = new Set<FlashMessageComponent>();
      constructor() {
      }

      _register(info: FlashMessageComponent): void {
            this.customAlerts.add(info);
            console.log('FlashMessageComponent _register', this.customAlerts);
      }

      _unregister(info: FlashMessageComponent): void {
            this.customAlerts.delete(info);
            console.log('FlashMessageComponent _unregister', this.customAlerts);
      }


      show(id: string, msg: string, time: number, className: 'alert-primary' | 'alert-seconda' | 'alert-success' | 'alert-danger' | 'alert-warning' | 'alert-info' | 'alert-light' | 'alert-dark') {

            this.customAlerts.forEach((item: FlashMessageComponent) => {

                  if (item.basicSetting.id === id) {
                        item.visible = true;
                        item.alertClass = 'alert ' + className;
                        item.msg = msg;
                        setTimeout(() => {
                              item.visible = false;
                        }, time);
                  }

            })


      }

      hide(info: AlertI) {


      }
}


