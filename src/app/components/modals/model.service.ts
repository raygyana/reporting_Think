import { Injectable } from '@angular/core';
import { ModalModelOptions } from './modals.model';
declare var $;


@Injectable()

export class ModalService {

      constructor() {
      }

      show(id: string | ModalModelOptions) {

            if (typeof id === 'string') {
                  $('#' + id).modal('show');
            } else {
                  $('#' + id.id).modal('show');
            }
      }

      hide(id: string | ModalModelOptions) {

            if (typeof id === 'string') {
                  $('#' + id).modal('hide');
            } else {
                  $('#' + id.id).modal('hide');
            }
      }
}
