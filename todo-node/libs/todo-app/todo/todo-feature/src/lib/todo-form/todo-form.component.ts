import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Mode } from '@todo-node/shared/utils';

@Component({
  selector: 'node-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  @Input() formVisible: boolean;
  @Input() formMode: Mode;
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();

  get mode(): typeof Mode {
    return Mode;
  }

  readonly minDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  public hideDialog(): void {
    this.dialogClosed.emit();
  }

  public save(): void {

  }

}
