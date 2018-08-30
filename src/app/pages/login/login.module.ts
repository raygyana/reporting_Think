import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LoginComponent } from './login.component';
import { routing } from './login.routing';
import { CoreModule } from '../../core/core.module';
import { MitLoginComponent } from './mit-login/mit-login.component';
import { PhpLoginComponent } from './php-login/php-login.component';
import { UcpLoginComponent } from './ucp-login/ucp-login.component';
import { LoginGuard } from './login.guard';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        routing,
        CoreModule
    ],
    declarations: [
        //   LoginComponent,
        MitLoginComponent,
        PhpLoginComponent,
        UcpLoginComponent
    ],
    providers: [
        LoginGuard
    ]
})
export class LoginModule { }
