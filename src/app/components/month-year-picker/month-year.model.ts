import { BaseComponent } from '../../core';

export class MonthYearModel {
      fistDate?: string = null;
      secDate?: string = null;
      BaseComponent: BaseComponent;
      showSingleDate?= false;

}

export class MonthYearOutputModel {
      fistDate: string = null;
      secDate: string = null;
      constructor(fistDate?: any, secDate?: any) {

            // const currentDate = new Date();
            // const currentYear = currentDate.getFullYear();
            // let currentMonth: any = currentDate.getMonth() + 1;
            // currentMonth = ('0' + currentMonth).slice(-2);
            // const today = currentMonth + '/' + currentYear;
            // this.fistDate = fistDate || today;
            // this.secDate = secDate || today;
            this.fistDate = '';
            this.secDate = '';
      }
}


//  val = ('0' + num).slice(-2);