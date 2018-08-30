import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChangeService {
    //    liveMonthChange: Subject<number> = new Subject<number>();
    savedSearchesChange = new Subject<any>();

    constructor() {
    }

    triggerSavedSearchesChange() {
        this.savedSearchesChange.next(0);
    }

    changeSavedSearches(): Observable<any> {
        return this.savedSearchesChange.asObservable();
    }
}

