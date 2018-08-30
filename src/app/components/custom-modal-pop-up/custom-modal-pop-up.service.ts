import { Injectable } from '@angular/core';
declare var $;
import { CustomModalPopUpModel } from './custom-modal-pop-up.model';
@Injectable()
export class CustomModalPopUpService {


      private customPopUps = new Set<CustomModalPopUpModel>();
      constructor() {
      }

      _register(info: CustomModalPopUpModel): void {
            this.customPopUps.add(info);
            console.log('CustomModalPopUpModel _register', this.customPopUps);
      }

      _unregister(info: CustomModalPopUpModel): void {
            this.customPopUps.forEach(item => {
                  if (item === info) {
                        this.customPopUps.delete(item);
                  }
            });
            console.log('CustomModalPopUpModel _unregister', this.customPopUps);
      }

      showHideMe(val: boolean, id: string) {
            if (val) {
                  $(`#${id}`).modal('show');
            } else {
                  $(`#${id}`).modal('hide');
            }
      }


      show(info: CustomModalPopUpModel) {
            $(`#${info.id}`).modal('show');
      }

      hide(info: CustomModalPopUpModel) {
            $(`#${info.id}`).modal('hide');
      }

}
