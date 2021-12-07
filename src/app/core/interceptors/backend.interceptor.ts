import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.startsWith("backend")) {
      request = request.clone({
        url: "http://207.180.246.34:8000" + request.url.replace("backend", ""),
      });
      console.log("Going to execute the following Backend request:")
      console.log(request);
    }
    return next.handle(request);
  }
}
