import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { ConfigService } from "../services/config.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AppService } from "../services/app.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private configService: ConfigService,
    private appService: AppService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.configService.isSetup()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${this.appService.getAuthorizationToken()}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigateByUrl("/signin");
          }
        }
        return Observable.throw(error);
      })
    );
  }
}
