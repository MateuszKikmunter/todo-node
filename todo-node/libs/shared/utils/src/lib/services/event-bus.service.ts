//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

//local imports
import { Action } from '../enums/action';
import { EventData } from '../interfaces/event.data';


@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject$ = new Subject();

  /** Emits an event with some values.
   * @param event event with unique name and action(s) to perform when it occurs
  */
  public emit(event: EventData): void {
    this.subject$.next(event);
  }

  /** Performs provided action when a specific event occurs.
   * @param eventName name of the event
   * @param action action(s) to be performed
  */
  public on(eventName: Action, action: any): Subscription {
    return this.subject$.pipe(
      filter((event: EventData) => event.action === eventName),
      map((event: EventData) => event.value)).subscribe(action);
  }
}