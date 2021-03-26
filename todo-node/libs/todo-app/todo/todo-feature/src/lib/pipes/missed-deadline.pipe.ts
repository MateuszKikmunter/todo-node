//Angular imports
import { Pipe, PipeTransform } from '@angular/core';

//local imports
import { DeadlineValidatorService } from './../services/deadline-validator.service';


@Pipe({
  name: 'missedDeadline'  
})
export class MissedDeadlinePipe implements PipeTransform {

  constructor(private deadlineValidator: DeadlineValidatorService) {}

  transform(value: string): string {
    return this.deadlineValidator.isDeadlineMissed(value)
      ? `${ value }⚠️`
      : value;    
  }

}
