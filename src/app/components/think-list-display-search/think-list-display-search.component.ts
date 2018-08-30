import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SearchModelType } from '../../pages/shared/search-model-type';
import { ThinkListDisplaySearchModel } from './think-list-display-search.model';
import { ProjectUtils } from 'app/pages/shared/project-utils';

@Component({
    selector: 'app-think-list-display-search',
    templateUrl: './think-list-display-search.component.html',
    styleUrls: ['./think-list-display-search.component.css']
})
export class ThinkListDisplaySearchComponent implements OnInit, OnChanges {
    displayKey: any = [];
    displayData: any = [];

    @Input() displaySearchOptions: ThinkListDisplaySearchModel;
    @Input() SingleDate = false;
    //    @Input() displaySearch: any;
    @Output() onSearchClick = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
        if (!this.displaySearchOptions) {
            throw new Error('Display Search Model attribute missing.');
        }
        if (!this.displaySearchOptions.displaySearch) {
            throw new Error('Display Search must have a "displaySearch" attribute.');
        }
        this.refreshDisplayData(this.displaySearchOptions.displaySearch);
    }


    ngOnChanges() {

    }

    refreshDisplayData(searchArray: any) {
        this.displayData = [];
        console.log('searchArray', searchArray, this.displaySearchOptions.orderList);

        // console.log('refreshDisplayData', this.displaySearchOptions.displaySearch,
        // Object.keys(this.displaySearchOptions.displaySearch).length);

        if (!ProjectUtils.isEmpty(this.displaySearchOptions.orderList)) {
            const newArray = [];

            this.displaySearchOptions.orderList
                .forEach((item) => {
                    Object.keys(item)
                        .forEach((k => {
                            newArray.push({
                                order: item[k],
                                value: searchArray[k]
                            })
                        }))
                })

            ProjectUtils.sortArray(newArray, 'order');

            searchArray = [];
            newArray.forEach(element => {
                searchArray.push(element['value'])
            });

            console.log('searchArray', newArray, this.displaySearchOptions.orderList);
        }

        if ((searchArray !== undefined)
            && (Object.keys(searchArray).length > 0)) {
            this.createDisplayData('', searchArray);
        }
        // console.log(this.displayData);
    }

    createDisplayData(defaultKey: any, searchArray: any | Object) {
        // console.log('createDisplayData', searchArray);
        for (const key in searchArray) {
            if (searchArray.hasOwnProperty(key)) {


                const selectedIndex = this.displaySearchOptions.IgnoreList.find(item => item === key);
                // console.log( 'selectedIndex', selectedIndex );
                if (selectedIndex === undefined) {
                    const val: string = searchArray[key];

                    //                console.log( key, ':', val, ':',
                    //                    ( typeof val === 'object' ),
                    //                    ( Array.isArray( val ) ) );
                    // console.log((typeof val === 'string'));
                    // console.log((typeof va== 'number'));
                    // console.log(key);

                    if ((key !== 'constructor')
                        && (val !== undefined)
                        && (val !== null)
                        && (val !== '')) {

                        if (Array.isArray(val)) {
                            this.createDisplayData(key, val);
                        } else if (typeof val === 'object') {
                            this.displayData.push(val);
                        } else if (((typeof val === 'string')) && (val.indexOf("{") === 0)) {
                            this.displayData.push(JSON.parse(val));
                        } else {
                            // console.log(val.indexOf("{"));
                            let obj = {
                                id: (defaultKey === '') ? key : defaultKey,
                                desc: val,
                                columnName: (defaultKey === '') ? key : defaultKey

                            };
                            // console.log(obj);
                            this.displayData.push(obj);
                        }
                    }
                }
            }
        }
    }

    doOnSearchClick(whichString: string) {
        this.onSearchClick.emit(whichString);
    }

    isArray(obj: any): boolean {
        return Array.isArray(obj);
    }

    showCrossBox(obj: any): boolean {
        const selectedIndex = this.displaySearchOptions.noCrossList.find(item => item === obj.columnName);

        if (selectedIndex !== undefined) {
            return false;
        }

        if (obj.columnName === 'dbStart' || obj.columnName === 'dbEnd') {
            return false;
        }
        return true;
    }

    showOnlyStartDate(obj: any) {
        if ((obj.columnName === 'dbEnd' && this.SingleDate) || obj.columnName === 'limit') {
            return false;
        }
        return true;
    }

}
