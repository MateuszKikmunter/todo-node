//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';


@Injectable({
  providedIn: 'root'
})
export class DeadlineValidatorService {

    /** 
   * * Checks if deadline has been missed.
   * * Deadline is missed if it's before today's date.
   */
    public isDeadlineMissed(deadline: Date): boolean {
      dayjs.extend(customParseFormat);
      return dayjs().isAfter(deadline, 'days');
    }
}
