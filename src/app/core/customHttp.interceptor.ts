import { Injectable, Provider } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as Rx from 'rxjs/Rx';
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
      intercept(req: HttpRequest<any>, next: HttpHandler): Rx.Observable<HttpEvent<any>> {
            return next.handle(req);
      }
}


export const CustomInterceptorProvider: Provider = {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
};
