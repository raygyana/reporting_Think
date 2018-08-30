import { Component, OnInit, Input } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { TabsComponent } from '../ng-tabs/tabs.component';
import { TabComponent } from 'app/components/components';

@Component({
    selector: 'app-think-list-header',
    templateUrl: './think-list-header.component.html',
    styleUrls: ['./think-list-header.component.css']
})
export class ThinkListHeaderComponent implements OnInit {
    @Input() searchUrl: string;
    @Input() tabsComponent: TabsComponent;
    @Input() headerName: any;
    constructor() { }

    ngOnInit() {
        // if (!this.searchUrl) {
        // 	throw new Error('List must have a "searchUrl" attribute.');
        // }

        console.log('this.headername', this.headerName);
    }

    goToSearch() {
        this.tabsComponent.selectTab(this.tabsComponent.tabs.first);
    }


}
