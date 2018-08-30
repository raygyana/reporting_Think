import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ProjectUtils } from '../../pages/shared/project-utils';
import { SessionObject } from '../../pages/shared/session-object';
import { ChangeService } from '../../pages/shared/change-service';
import { SaveSearchService } from '../../pages/shared/save-search-service';

import { ModalModelOptions, ModalService } from '../modals';
import { BaseComponent } from '../../core/base/base.component';
declare var $;

@Component({
    selector: 'app-think-search-header',
    templateUrl: './think-search-header.component.html',
    styleUrls: ['./think-search-header.component.css'],
    providers: []
})


export class ThinkSearchHeaderComponent implements OnInit {
    private _saveSearchChange = new Subject<any>();
    mmOptionsRemoveSearch: ModalModelOptions;
    _subscription: any;
    objDeleteObject: any;
    isDeleteAllSelected = false;
    savedSearchList: any = [];
    OrgSavedSearchList: any = [];
    @Input() headerCaption: string;
    @Input() searchType: string;
    @Input() baseComponent: BaseComponent;
    @Input() showInfoPopUp: ModalModelOptions;

    constructor(
        private modalService: ModalService,
        private changeService: ChangeService,
        private saveSearchService: SaveSearchService) {
        this.doInitialSetup();
    }

    ngOnInit() {
        this.errorChecking();

        this.savedSearchList = this.saveSearchService.getSavedSearches(this.searchType);
        const sessionObject: SessionObject = SessionObject.getSessionObject();
        this.OrgSavedSearchList = Array.from(this.savedSearchList);

        this._subscription = this.changeService.changeSavedSearches()
            .subscribe(value => {
                this.savedSearchList = this.saveSearchService.getSavedSearches(this.searchType);
                this.OrgSavedSearchList = Array.from(this.savedSearchList);
            });

    }

    doInitialSetup() {
        this.mmOptionsRemoveSearch = new ModalModelOptions();
        this.mmOptionsRemoveSearch.id = 'searchHeader';
        this.mmOptionsRemoveSearch.captionHeading = 'Remove Saved Search!';
        this.mmOptionsRemoveSearch.bodyMessage = 'Are you sure want to delete?';
        this.mmOptionsRemoveSearch.button1 = 'No';
        this.mmOptionsRemoveSearch.button2 = 'Yes';
        this.mmOptionsRemoveSearch.showInput = false;
    }

    doOnDelete(deleteObject: any) {
        // console.log(deleteObject);
        this.objDeleteObject = deleteObject;
        this.mmOptionsRemoveSearch.captionHeading = 'Remove Saved Search!';
        this.mmOptionsRemoveSearch.bodyMessage = 'Are you sure you want to delete the saved search <strong> "' + deleteObject.searchLabel + '" </strong>?';
        $('#searchHeader').modal('show');
        // alert("Are you sure?");
    }

    doOnRemoveAll() {
        this.isDeleteAllSelected = true;
        this.mmOptionsRemoveSearch.captionHeading = 'Remove Saved Search List!';
        this.mmOptionsRemoveSearch.bodyMessage = 'Are you sure you want to delete <strong>ALL</strong> the saved searches?';
        $('#searchHeader').modal('show');

    }

    doOnDeleteSearch(which: any) {
        console.log('which', which);

        if (this.objDeleteObject !== undefined) {
            console.log(this.objDeleteObject, ' deleting...');
            this.saveSearchService.deleteSearchObject(this.changeService, this.objDeleteObject);

        } else if (this.isDeleteAllSelected) {
            console.log('Going to delete all records...');
            this.OrgSavedSearchList = [];
            this.savedSearchList = [];
            this.saveSearchService.deleteAllSearchObject(this.changeService, this.searchType);
        }
    }

    performSearch(searchableObject: any) {
        // console.log(searchableObject);
        // alert("About to perform search");
        if (this.baseComponent !== undefined) {
            this.baseComponent.onSubmit(ProjectUtils.cloneObject(searchableObject.searchModel), true);
        }
    }



    filterMySearch(searchStr: string) {
        console.log(searchStr)
        searchStr = searchStr.trim();
        this.savedSearchList = Array.from(this.OrgSavedSearchList);

        this.savedSearchList = this.OrgSavedSearchList.filter((item) => {
            console.log(item.searchLabel, item.searchLabel.toLowerCase().includes(searchStr.toLowerCase()))

            return item.searchLabel.toLowerCase().includes(searchStr.toLowerCase());
        })

    }


    errorChecking() {
        if (!this.headerCaption) {
            throw new Error('Search must have a "headerCaption" attribute.');
        }
        if (!this.searchType) {
            throw new Error('Search must have a "searchType" attribute.');
        }
        if (!this.baseComponent) {
            throw new Error('Search must have a "baseComponent" attribute.');
        }
    }

    onClickInfo() {
        this.mmOptionsRemoveSearch.captionHeading = this.showInfoPopUp.captionHeading;
        this.mmOptionsRemoveSearch.bodyMessage = this.showInfoPopUp.bodyMessage;
        this.mmOptionsRemoveSearch.button1 = this.showInfoPopUp.button1;
        this.mmOptionsRemoveSearch.button2 = 'Ok';
        this.modalService.show(this.mmOptionsRemoveSearch);
    }

}
