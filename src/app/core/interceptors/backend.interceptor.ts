import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log(request.url);
    if (request.url.startsWith("backend")) {
      request = request.clone({
        url: environment.backendUrl + request.url.replace("backend", ""),
      });
      console.log("Going to execute the following Backend request:")
      console.log(request);
    }
    return next.handle(request);
  }
}
