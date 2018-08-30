import {
    Routes, RouterModule, NavigationExtras
} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from './auth.guard';
import { DISABLED_PATH_ROUTE } from './error-pages/disabledpage/disabledpage.component';
import { MyClientAuthGuard } from '../core';



export let routes: Routes = [
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
            DISABLED_PATH_ROUTE,
            // { path:'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard]  },
            { path: 'insight-dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
            { path: 'dashboard', loadChildren: './think/think.module#ThinkModule', canActivate: [AuthGuard] },
            { path: 'think', loadChildren: './think/think.module#ThinkModule', canActivate: [AuthGuard] }
            // { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
            // { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            // { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
            // { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'maps', loadChildren: './maps/maps.module#MapsModule' }
        ]
    }
];



export class UrlForAllClients {
    myclients: Array<string>;
    clientRoutes: Routes = [];
    myFirstPage: string;
    routes: Routes = [
        {
            path: 'pages',
            component: PagesComponent,
            children: [
                {
                    path: '', redirectTo: 'dashboard', // 'dashboard',
                    pathMatch: 'full',
                    canActivate: [MyClientAuthGuard]
                },
                DISABLED_PATH_ROUTE,

                {
                    path: 'dashboard',
                    loadChildren: './think/think.module#ThinkModule',
                    canActivate: [AuthGuard]
                },
                {
                    path: 'think',
                    loadChildren: './think/think.module#ThinkModule',
                    canActivate: [AuthGuard]
                }
            ]
        }
    ];
    constructor(
        myclient: string,
        myFirstPage: string
    ) {
        this.myclients = [myclient];
        this.myFirstPage = myFirstPage;
        if (myclient) {
            this.makeUrls();
        }

    }

    makeUrls() {
        this.myclients.forEach((item) => {
            const clientPath = { path: item + '/' + this.routes[0].path };
            const myroute = Object.assign({}, this.routes[0], clientPath)
            myroute.children[0].redirectTo = this.myFirstPage;
            this.clientRoutes.push(myroute);
        });
    }
}

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
