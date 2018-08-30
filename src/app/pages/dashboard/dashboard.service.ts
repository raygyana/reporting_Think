import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class DashboardService {

      fullTextSub: Subject<any> = new Subject();
      accountCodeSUb: Subject<any> = new Subject();
      constructor() {

      }

      sendFullText(str: string) {
            this.fullTextSub.next(str);
      }

      sendAccountCode(code: any) {
            this.accountCodeSUb.next(code);
      }

}
