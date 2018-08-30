import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from './components/ngtabs';
// Component Services
import { AuthenticationService } from './pages/login/authentication.service';
import { AuthGuard } from './pages/auth.guard';

// Root Components
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { PagesModule } from './pages/pages.module';

import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';

import { TabsetComponent } from 'app/components/ngtabs';
import { TabsComponent } from 'app/components/ng-tabs/tabs.component';
import {
    CoreModule, MyClientServices,
    MyClientAuthGuard, TimeOutService,
    HighChartService, IDGeneratorService
} from './core';
import { LoginModule } from './pages/login/login.module';
import { LeftNavUrlSettingService } from './pages/left-nav/leftNavUrlSetting.service';
import { CustomModalPopUpService } from './components';

// import { TempComponent } from './temp/temp.component';
declare var require: any;


@NgModule({
    declarations: [
        //      TempComponent,

        AppComponent
    ],
    imports: [
        LoginModule,
        TabsModule.forRoot(),
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        PagesModule,
        routing,
        ComponentsModule,
        HttpClientModule
    ],
    providers: [
        CustomModalPopUpService,
        HighChartService,
        LeftNavUrlSettingService,
        MyClientAuthGuard,
        MyClientServices,
        AuthGuard,
        AuthenticationService,
        TimeOutService,
        IDGeneratorService,
        { provide: LOCALE_ID, useValue: 'en-US' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
