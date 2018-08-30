import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SessionObject } from './shared/session-object';
import { ChangeService } from './shared/change-service';
import { SaveSearchService } from './shared/save-search-service';
import { Log, Level } from 'ng2-logger';
@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    providers: [ChangeService, SaveSearchService]
})

export class PagesComponent {


    sessionObject: SessionObject;

    log = Log.create('PagesComponent');

    constructor(
    ) {
        this.sessionObject = SessionObject.getSessionObject();
    }

}
