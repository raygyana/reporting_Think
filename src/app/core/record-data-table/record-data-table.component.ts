import { Component, ViewChild } from '@angular/core';
// import {DataTable, DataTableTranslations, DataTableResource} from 'angular-4-data-table-bootstrap-4';
import { RecordDataTableService } from './record-data-table.service';


@Component({
    selector: 'app-record-data-table',
    templateUrl: './record-data-table.component.html',
    styleUrls: ['./record-data-table.component.css'],
    providers: [RecordDataTableService]
})
export class RecordDataTableComponent {
    recorDataResource: any;
    records = [];
    recorDataCount = 0;
    recordDataTableHeaders: Array<any> = [];

    //    @ViewChild(DataTable) recordDataTable;

    // special params:
    //    translations = <DataTableTranslations>{
    //        indexColumn: 'Index column',
    //        //        expandColumn: 'Expand column',
    //        selectColumn: 'Select column',
    //        paginationLimit: 'Max results',
    //        paginationRange: 'Result range'
    //    };

    constructor(private recordDataTableService: RecordDataTableService) {
        console.log(recordDataTableService.data);
        console.log(recordDataTableService.data[0]['records']);
        // this.recordDataTableHeaders = recordDataTableService.data[0]['headers'];
        console.log(this.recordDataTableHeaders);

        // this.recorDataResource = new DataTableResource(recordDataTableService.data[0]['records']);
        //        this.recorDataResource = new DataTableResource(recordDataTableService.films);
        console.log(recordDataTableService.films);

        for (const recordTable in recordDataTableService.films[0]) {
            if (recordTable !== null) {
                console.log(recordTable);
                this.recordDataTableHeaders.push(recordTable);
            }
        }

        //        for (const recordTables of recordDataTableService.films) {
        //                    for (const recordTable in recordTables) {
        //                        console.log(recordTable);
        //            }
        //        }
        this.recorDataResource.count().then(count => this.recorDataCount = count);
    }

    reloadDataRecord(params) {
        this.recorDataResource.query(params).then(records => this.records = records);
    }

    cellColor(car) {
        return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
    };



}
