import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Location } from '@angular/common';
// Import from III party
import { Logger } from '../../../core/logger/logger';
import { LoaderService } from '../../../core/loader/loader.service';
import { BaseComponent } from '../../../core/base/base.component';
import { ProjectUtils } from '../../shared/project-utils';
import { SessionObject } from '../../shared/session-object';
import { GlobalService } from '../../shared/global.service';
import { ChangeService } from '../../shared/change-service';
import { SaveSearchService } from '../../shared/save-search-service';
import { SettingsService } from './settings.service';
import { rotateX } from '../../../Animations/rotate.animation';
import { GlobalSettings } from '../../shared/global-settings';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [SettingsService],
    animations: [
        rotateX

    ]
})
export class SettingsComponent extends BaseComponent {


    sessionObject_l: SessionObject = SessionObject.getSessionObject();

    clientData: any;
    msg: Boolean = false;
    msgDisplay = '';
    // @ViewChild(ThinkListDisplaySearchComponent) dispSearch: ThinkListDisplaySearchComponent;
    initialClient: string;
    constructor(
        private router: Router,
        protected loaderService: LoaderService,
        private _logger: Logger,
        protected changeService: ChangeService,
        protected saveSearchService: SaveSearchService,
        private settingsService: SettingsService,
        protected location: Location,
        protected globalService: GlobalService) {
        super(loaderService, changeService, saveSearchService, settingsService, globalService);
        // this.getClientData();
        this.msgDisplay = '';

        this.initialClient = this.sessionObject_l.clientID;
        console.log('this.initialClient', this.initialClient)
    }

    getClientData() {
        this.clientData = this.globalService.getClientData();
        console.log(this.clientData);

    }
    doPreInitLoad() {
        this.sessionObject_l = SessionObject.getSessionObject();
    }


    // override
    getLoaderName(): string {
        return 'settings';
    }



    onSubmitClick() {

        if (!ProjectUtils.isEmpty(this.sessionObject_l.limit)) {
            this.msgDisplay = 'Saving...';
            this.msg = true;
            console.log('limit:', this.sessionObject_l.limit);
            SessionObject.setSessionObject(this.sessionObject_l);
            console.log(this.sessionObject_l.limit, 'sessionObject', this.sessionObject_l, SessionObject.getSessionObject());
            setTimeout(() => {
                this.msgDisplay = 'Changed Successfully';
            }, 500);
            setTimeout(() => {
                this.msg = false;
                this.msgDisplay = '';
                // this.location.back();
            }, 2000);
        }

        /*
        if (!ProjectUtils.isEmpty(this.sessionObject_l.limit) && !ProjectUtils.isEmpty(this.initialClient)) {
            this.msgDisplay = 'Saving...';
            this.msg = true;

            console.log('limit:', this.sessionObject_l.limit, 'ClientID:', this.initialClient);
            if (this.initialClient === 'ucp') {
                this.sessionObject_l.clientSettings = GlobalSettings.UCP_UI_SETTING;
            } else if (this.initialClient === 'php') {
                this.sessionObject_l.clientSettings = GlobalSettings.PHP_UI_SETTING;
            } else if (this.initialClient === 'mit') {
                this.sessionObject_l.clientSettings = GlobalSettings.MIT_UI_SETTING;
            }

            this.sessionObject_l.clientID = this.initialClient;
            SessionObject.setSessionObject(this.sessionObject_l);
            console.log(this.initialClient, this.sessionObject_l.limit, ' this.sessionObject.clientID', this.sessionObject_l.clientID);
            console.log(ProjectUtils.getClientCode());
            setTimeout(() => {
                this.msgDisplay = 'Changed Successfully';
            }, 500);
            setTimeout(() => {
                this.msg = false;
                this.msgDisplay = '';
            }, 5000);
        }*/
    }
    onReset() {
        this.msgDisplay = '';
        this.msg = false;
    }

    public restrictNumeric(e: any) {
        this.msg = false;
        let input;
        console.log(e.which);
        if (e.which > 95 && e.which < 107) {
            return true;
        } else if ((e.which > 34 && e.which < 38) || e.which === 39 || e.which === 46) {
            return true;
        } else if (e.metaKey || e.ctrlKey) {
            return true;
        } else if (e.which === 32) {
            return false;
        } else if (e.which === 0) {
            return true;
        } else if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }


}
