import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DataTablesModule } from 'angular-datatables';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { GlobalService } from './shared/global.service';
import { routing } from './pages.routing';
import { AuthGuard } from './auth.guard';
import { ThinkModule } from './think/think.module';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SaveSearchService } from './shared/save-search-service';
import { DisabledpageComponent } from './error-pages/disabledpage/disabledpage.component';

@NgModule({
    imports: [
        ComponentsModule,
        CommonModule,
        routing,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        DisabledpageComponent,
        PagesComponent,
        LeftNavComponent
    ],
    providers: [
        AuthGuard,
        GlobalService,
        SaveSearchService
    ],
    exports: [

    ]
})

export class PagesModule {
}
