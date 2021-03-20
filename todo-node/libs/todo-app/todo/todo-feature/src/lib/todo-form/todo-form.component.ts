import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'node-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  @Input() formVisible: boolean;

  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  readonly minDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  public hideDialog(): void {
    this.modalClosed.emit();
  }

  public save(): void {

  }

}
