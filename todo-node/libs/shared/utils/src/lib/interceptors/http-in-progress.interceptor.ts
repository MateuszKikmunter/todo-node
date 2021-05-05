//Angular imports
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

//libs imports
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { EventBusService } from '@todo-node/shared/utils';

//local imports
import { Action } from '../enums/action';


@Injectable()
export class HttpInProgressInterceptor implements HttpInterceptor {

  constructor(private eventBus: EventBusService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => this.eventBus.emit({ action: Action.LOADING, value: true })),
      finalize(() => this.eventBus.emit({ action: Action.LOADING, value: false }))
      );
  }
}
