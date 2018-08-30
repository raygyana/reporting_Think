import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { DataDropDownComponent } from './data-drop-down/data-drop-down.component';
import { CzDatePickerComponent } from './cz-date-picker/cz-date-picker.component';
import { ModalsComponent } from './modals/modals.component';
import { TabsComponent } from './ng-tabs/tabs.component';
import { TabComponent } from './ng-tabs/tab.component';
import { DynamicTabsDirective } from './ng-tabs/dynamic-tabs.directive';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

import { MomentModule } from 'angular2-moment';
import { DataTablesModule } from 'angular-datatables';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MyAutoCompleteComponent } from './my-auto-complete/my-auto-complete';
import { Ng2CompleterModule } from './Completer';
import { CustomModalPopUpComponent } from './custom-modal-pop-up/custom-modal-pop-up.component';
import { DtWithComponentComponent } from './dt-with-component/dt-with-component.component';

import { FilterArrayPipe, AutoCompleteComponent } from './auto-complete';
import { MonthYearPickerComponent } from './month-year-picker/month-year-picker.component';
import { ModalService } from './modals/model.service';
import { CustomCkeditorComponent } from './custom-ckeditor/custom-ckeditor.component';
// import { DatePickerModule } from './ng2-datepicker-bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { MailWithCkeditorComponent } from './mail-with-ckeditor/mail-with-ckeditor.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FlashMessageService } from './flash-message/flash-message.service';
import { CommonDirectiveModlue } from '../directive'


import { ThinkSearchFooterComponent } from './think-search-footer/think-search-footer.component';
import { ThinkListHeaderComponent } from './think-list-header/think-list-header.component';
import { ThinkListDisplaySearchComponent } from './think-list-display-search/think-list-display-search.component';
import { ThinkSearchHeaderComponent } from './think-search-header/think-search-header.component';
import { LeftMenuBarComponent } from './left-menu-bar/left-menu-bar.component';
import { MyChartsComponent } from './my-charts/my-charts.component';
import { MyChartService } from './my-charts/my-charts.service';
import { LeftMenuBarService } from './left-menu-bar/left-menu-bar.service';
import { DynamicDatatableComponent } from './dynamic-datatable/dynamic-datatable.component';
@NgModule({
    imports: [
        CommonDirectiveModlue,
        CommonModule,
        FormsModule,
        Daterangepicker,
        MomentModule,
        RouterModule,
        DataTablesModule,
        MultiselectDropdownModule,
        ReactiveFormsModule,
        Ng2CompleterModule,
        CKEditorModule
        // DatePickerModule
    ],
    exports: [
        CommonDirectiveModlue,
        DynamicDatatableComponent,
        LeftMenuBarComponent,
        MyChartsComponent,
        FlashMessageComponent,
        MailWithCkeditorComponent,
        CustomCkeditorComponent,
        MonthYearPickerComponent,
        FilterArrayPipe,
        AutoCompleteComponent,
        CustomModalPopUpComponent,
        MultiselectDropdownModule,
        ThinkSearchHeaderComponent,
        ThinkSearchFooterComponent,
        ThinkListHeaderComponent,
        ThinkListDisplaySearchComponent,
        DataDropDownComponent,
        CzDatePickerComponent,
        TabsComponent,
        TabComponent,
        DynamicTabsDirective,
        ModalsComponent,
        DynamicTableComponent,
        MyAutoCompleteComponent,
        DtWithComponentComponent
    ],
    declarations: [
        FilterArrayPipe,
        ThinkSearchHeaderComponent,
        ThinkSearchFooterComponent,
        ThinkListHeaderComponent,
        ThinkListDisplaySearchComponent,
        DataDropDownComponent,
        CzDatePickerComponent,
        TabsComponent,
        TabComponent,
        DynamicTabsDirective,
        ModalsComponent,
        DynamicTableComponent,
        MyAutoCompleteComponent,
        CustomModalPopUpComponent,
        DtWithComponentComponent,
        AutoCompleteComponent,
        MonthYearPickerComponent,
        CustomCkeditorComponent,
        MailWithCkeditorComponent,
        FlashMessageComponent,
        MyChartsComponent,
        LeftMenuBarComponent,
        DynamicDatatableComponent
    ],
    providers: [
        LeftMenuBarService,
        ModalService,
        FlashMessageService,
        MyChartService
        //CompleterService
    ],
    entryComponents: [TabComponent]
})

export class ComponentsModule { }
