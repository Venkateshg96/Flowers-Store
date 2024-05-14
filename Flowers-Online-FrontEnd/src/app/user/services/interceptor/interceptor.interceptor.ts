import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>
  {
    request = request.clone({
      setHeaders : {
        authorization : 'Bearer '+this.authService.getToken(),
      }
    });

    return next.handle(request);
  }
}
