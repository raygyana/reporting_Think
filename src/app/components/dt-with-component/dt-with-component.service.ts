import { Injectable } from '@angular/core';


@Injectable()
export class DtWithComponentService {


      getMyDtOption(dtOptions: any) {
            dtOptions['aaSorting'] = [];  // for disable starting sort

            // dtOptions['aoColumnDefs'] = [
            //       { 'bSortable': false, 'aTargets': [0, 1, 2] }
            // ]
      }


}
