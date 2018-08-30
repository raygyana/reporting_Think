import { Injectable } from '@angular/core';
import { IDGeneratorService } from '../../core';
import { LeftMenuBarComponent } from './left-menu-bar.component';

@Injectable()
export class LeftMenuBarService {



      constructor(
            private IDGeneratorService: IDGeneratorService
      ) {
            this.IDGeneratorService.initIDOfType('LeftMenuBar');
      }


      _reg(info: LeftMenuBarComponent) {
            info.id = this.IDGeneratorService.generateNewIDOf('LeftMenuBar');
      }

}
