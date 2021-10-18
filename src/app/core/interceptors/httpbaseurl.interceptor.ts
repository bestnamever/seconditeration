import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


  /*------------------------------------------------------------------------*/
  //    Explanation of an Interceptor:                                      //
  //                                                                        //
  //    An interceptor is a class EVERY http call goes through,             //
  //    which you can use for editing URL's, parameters, or checking        //
  //    data that gets sent for example                                     //
  /*------------------------------------------------------------------------*/


@Injectable()
export class HttpbaseurlInterceptor implements HttpInterceptor {

  // Basic constructor
  constructor() {}

  // Override HTTP intercept
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Changing the URL to the one for our backend
    request = request.clone({
      url: 'http://localhost:8090' + request.url
    });

    return next.handle(request);
  }
}
