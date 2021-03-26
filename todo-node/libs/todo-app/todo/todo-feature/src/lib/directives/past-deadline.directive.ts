//Angular imports
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

//local imports
import { DeadlineValidatorService } from './../services/deadline-validator.service';


@Directive({
  selector: '[taskPastDeadline]'
})
export class PastDeadlineDirective implements OnInit {

  @Input('taskPastDeadline') deadline: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private deadlineValidator: DeadlineValidatorService) { }

  ngOnInit(): void {
    if(this.deadlineValidator.isDeadlineMissed(this.deadline)) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'orange');      
    }
  }

}
