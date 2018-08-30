import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { URLSearchParams } from '@angular/http';
import { SessionObject } from './session-object';
import { ChangeService } from './change-service';
import { Constants } from './constant';
import { BaseService } from '../../core/base/base.service';
import { SavedSearchModel } from '../../components/think-search-header/saved-search.model';


@Injectable()
export class SaveSearchService extends BaseService {

    getServiceURL(): string {
        return Constants.TK_SS_GET_SAVE_SEARCHES_URL;
    }

    /*********************Start of saved search functions*******************/
    getSavedSearches(searchType: any): any {
        this.sessionObject = SessionObject.getSessionObject();
        const savedSearchData = [];
        if (this.sessionObject.savedSearches) {
            for (const item of this.sessionObject.savedSearches) {
                if (item.searchType === searchType) {
                    savedSearchData.push(item);
                }
            }
        }
        console.log('searchType', searchType);
        console.log('savedSearchData', savedSearchData);
        console.log('sessionObject.savedSearches', this.sessionObject.savedSearches);
        return savedSearchData;
    }

    setSavedSearch(changeService: ChangeService, saveSearchModel: any) {
        this.sessionObject = SessionObject.getSessionObject();
        let exist = false;
        if (this.sessionObject.savedSearches === undefined) {
            this.sessionObject.savedSearches = [];
        } else {
            let index = 0;
            for (const item of this.sessionObject.savedSearches) {
                if ((item.searchType === saveSearchModel.searchType) &&
                    (item.searchLabel === saveSearchModel.searchLabel)) {
                    console.log('SaveSearchService: setSavedSearch matched found', item, saveSearchModel);
                    this.sessionObject.savedSearches[index] = saveSearchModel;
                    SessionObject.setSessionObject(this.sessionObject);
                    this.saveUpdateSearchObjectOnServer(false, saveSearchModel);
                    exist = true;
                    changeService.triggerSavedSearchesChange();
                    // }
                }
                index++;
            }
        }
        console.log('this.sessionObject.savedSearches:', this.sessionObject.savedSearches);
        if (!exist) {
            this.saveUpdateSearchObjectOnServer(true, saveSearchModel);
            this.sessionObject.savedSearches.push(saveSearchModel);
            console.log(this.sessionObject);
            SessionObject.setSessionObject(this.sessionObject);
            changeService.triggerSavedSearchesChange();
        }
        console.log('this.sessionObject.savedSearches:', this.sessionObject.savedSearches);
    }

    deleteSearchObject(changeService: ChangeService, deleteObject: any) {
        this.sessionObject = SessionObject.getSessionObject();
        if (this.sessionObject.savedSearches !== undefined) {
            for (const item of this.sessionObject.savedSearches) {
                // console.log(item);
                if ((item.searchType === deleteObject.searchType) &&
                    (item.searchLabel === deleteObject.searchLabel)) {
                    const index: number = this.sessionObject.savedSearches.indexOf(item);
                    if (index !== -1) {
                        this.deleteSearchObjectFromServer(this.sessionObject.savedSearches[index]);
                        this.sessionObject.savedSearches.splice(index, 1);
                        SessionObject.setSessionObject(this.sessionObject);
                        changeService.triggerSavedSearchesChange();
                    }
                }
            }
        }
    }

    deleteAllSearchObject(changeService: ChangeService, searchType: any) {
        this.sessionObject = SessionObject.getSessionObject();
        const saveSearchesObject = this.sessionObject.savedSearches;
        if (saveSearchesObject !== undefined) {

            const searchLen = saveSearchesObject.length - 1;
            for (let index = searchLen; index >= 0; index--) {
                const item = saveSearchesObject[index];
                // console.log('Searching Record found for delete ************************', item);
                if (item.searchType === searchType) {
                    // console.log('Record found for delete ************************', index);
                    this.deleteSearchObjectFromServer(saveSearchesObject[index]);
                    saveSearchesObject.splice(index, 1);
                }
            }
            this.sessionObject.savedSearches = saveSearchesObject;
            SessionObject.setSessionObject(this.sessionObject);
            changeService.triggerSavedSearchesChange();
        }
    }

    loadSearchesFromServer() {
        this.refreshSessionObject();
        this.sessionObject = SessionObject.getSessionObject();
        console.log(this.sessionObject);
        if (this.sessionObject.activeCurrentUser !== undefined) {
            const body = 'userId=' + this.sessionObject.activeCurrentUser.userID;
            this.getData(body).subscribe(data => {
                //    console.log(data);
                //                if (this.sessionObject.savedSearches === undefined) {
                this.sessionObject.savedSearches = [];
                //                }
                for (const record of data) {
                    const savedSearchModel: SavedSearchModel = new SavedSearchModel();
                    console.log(record.searchModelObject);
                    // savedSearchModel.searchModel = JSON.parse(record.searchModelObject);
                    savedSearchModel.searchModel = record.searchModelObject;
                    savedSearchModel.searchType = record.searchType;
                    savedSearchModel.searchLabel = record.searchLabel;
                    this.sessionObject.savedSearches.push(savedSearchModel);
                }
                SessionObject.setSessionObject(this.sessionObject);
                //  console.log(this.sessionObject);
            }, err => {
                console.error('Unable to load saved searches');
            });
        }
    }

    saveUpdateSearchObjectOnServer(insert: boolean, saveSearchModel: any) {
        this.sessionObject = SessionObject.getSessionObject();
        const str = JSON.stringify(saveSearchModel.searchModel);
        console.log('str', JSON.parse(str));

        const data = new URLSearchParams();
        this.newSetParamValue(data, 'userId', '' + this.sessionObject.activeCurrentUser.userID);
        this.newSetParamValue(data, 'searchLabel', saveSearchModel.searchLabel);
        this.newSetParamValue(data, 'searchType', saveSearchModel.searchType);
        this.newSetParamValue(data, 'searchModelObject', str);
        const body = data.toString();

        if (insert) {
            this.getDataWithURL(Constants.TK_SS_SAVE_SEARCH_URL, body)
                .subscribe(data2 => {
                    console.log(data2);
                }, err => {
                    console.error('Unable to Save Search record!');
                });
        } else {
            this.getDataWithURL(Constants.TK_SS_UPDATE_SEARCH_URL, body)
                .subscribe(data3 => {
                    console.log(data3);
                }, err => {
                    console.error('Unable to update Search record!');
                });
        }
    }

    deleteSearchObjectFromServer(saveSearchModel: any) {
        this.sessionObject = SessionObject.getSessionObject();
        let body = 'userId=' + this.sessionObject.activeCurrentUser.userID;
        body += '&searchLabel=' + saveSearchModel.searchLabel;
        body += '&searchType=' + saveSearchModel.searchType;
        this.getDataWithURL(Constants.TK_SS_DELETE_SEARCH_URL, body)
            .subscribe(data => {
                console.log(data);
            }, err => {
                console.error('Unable to delete Search record!');
            });
    }



    /*********************End of saved search functions*******************/
}
