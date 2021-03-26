import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[taskPastDeadline]'
})
export class PastDeadlineDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

}
