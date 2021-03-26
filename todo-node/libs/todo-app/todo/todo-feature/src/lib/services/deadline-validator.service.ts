//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { DD_MM_YYYY } from '@todo-node/shared/utils';
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
    public isDeadlineMissed(deadline: string): boolean {
      dayjs.extend(customParseFormat);
      return dayjs().isAfter(dayjs(deadline, DD_MM_YYYY));
    }
}
