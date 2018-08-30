import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AuthGuard } from './pages/auth.guard';

// Routing for common components

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
        canActivate: [AuthGuard],

    }, {
        path: '**',
        redirectTo: 'pages/dashboard',
        canActivate: [AuthGuard]
    }
]

const myExptraOptions: ExtraOptions = { useHash: false, enableTracing: false }

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, myExptraOptions);
