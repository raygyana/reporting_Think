import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MitLoginComponent } from './mit-login/mit-login.component';
import { PhpLoginComponent } from './php-login/php-login.component';
import { UcpLoginComponent } from './ucp-login/ucp-login.component';
import { LoginGuard } from './login.guard';
import { AuthGuard } from './../auth.guard';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'mit/login',
        pathMatch: 'full',
        canActivate: [LoginGuard]
    },
    {
        path: 'mit',
        redirectTo: 'mit/login',
        canActivate: [LoginGuard]
    },
    {
        path: 'mit/login',
        component: MitLoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'php',
        redirectTo: 'php/login',
        canActivate: [LoginGuard]
    },
    {
        path: 'demo/login',
        canActivate: [LoginGuard],
        component: PhpLoginComponent,
    },
    {
        path: 'demo',
        redirectTo: 'demo/login',
        canActivate: [LoginGuard]
    },
    {
        path: 'php/login',
        component: PhpLoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'ucp',
        redirectTo: 'ucp/login',
        canActivate: [LoginGuard]
    },
    {
        path: 'ucp/login',
        component: UcpLoginComponent,
        canActivate: [LoginGuard]
    }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
