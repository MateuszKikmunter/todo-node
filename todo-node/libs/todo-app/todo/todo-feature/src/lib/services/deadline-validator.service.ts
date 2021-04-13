//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import * as dayjs from 'dayjs';


@Injectable({
  providedIn: 'root'
})
export class DeadlineValidatorService {

    /** 
   * * Checks if deadline has been missed.
   * * Deadline is missed if it's before today's date.
   */
    public isDeadlineMissed(deadline: Date): boolean {
      return dayjs().isAfter(deadline, 'days');
    }
}
