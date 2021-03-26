//Angular imports
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

//libs imports
import { DD_MM_YYYY } from '@todo-node/shared/utils';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';


@Directive({
  selector: '[taskPastDeadline]'
})
export class PastDeadlineDirective implements OnInit {

  @Input('taskPastDeadline') deadline: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if(this.isDeadlineMissed()) {
      this.elementRef.nativeElement.style.color = 'orange';
    }
  }

  /** 
   * * Checks if deadline has been missed.
   * * Deadline is missed if it's before today's date.
   */
  private isDeadlineMissed(): boolean {
    dayjs.extend(customParseFormat);
    return dayjs().isAfter(dayjs(this.deadline, DD_MM_YYYY));
  }

}