import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Pipe({
      name: 'filterArray',
      pure: false
})

export class FilterArrayPipe implements PipeTransform {

      myObservable = Observable.create((observer: Observer<Array<string>>) => {
            //  observer.next
      })



      private filterByString(filter) {
            if (filter) {
                  filter = filter.toLowerCase();
            }
            return value => {
                  return !filter || (value ? ('' + value).toLowerCase().includes(filter) : false);
            }
      }

      transform(array: any[], filter: any): any {
            return Observable.create((observer: Observer<Array<string>>) => {
                  observer.next(array.filter(this.filterByString(filter)))
            });
      }
}

