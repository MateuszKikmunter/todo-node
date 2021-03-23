import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Mode, Task } from '@todo-node/shared/utils';


@Component({
  selector: 'node-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {

  @Input() formVisible: boolean;
  @Input() formMode: Mode;
  @Input() task: Task;
  @Output() saveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();  

  public todoForm: FormGroup;

  get name(): AbstractControl {
    return this?.todoForm.get('name');
  }

  get deadline(): AbstractControl {
    return this?.todoForm.get('deadline');
  }

  get mode(): typeof Mode {
    return Mode;
  }

  readonly nameMaxLength = 255;
  readonly minDate = new Date();

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.formMode) {
      this.onModeChange(changes.formMode.currentValue);
    }
  }

  ngOnInit(): void {
    this.buildForm();    
  }

  public hideDialog(): void {
    this.dialogClosed.emit();
  }

  public save(): void {
    if(this.todoForm.valid) {
      this.saveTask.emit({ ...this.todoForm.value });
      this.todoForm.reset();
    }
  }  

  /** Builds todoForm if it does not exist. */
  private buildForm(): void {    
    if(!this.todoForm) {
      this.todoForm = this.formBuilder.group({
        name: [ null, [ Validators.required, Validators.maxLength(this.nameMaxLength) ] ],
        additionalDetails: [ null ],
        deadline: [ null, Validators.required ],
        completed: [ false ]
      });
    }
  }

  /** 
   * Enables/disables/clears/patches form whenever formMode inout value changes.
   * @param mode current formMode value
  */
  private onModeChange(mode: Mode): void {
    if(mode === Mode.READONLY || mode === Mode.EDIT) {       
      this.todoForm?.patchValue(this?.task ?? {});
    }

    if(mode === Mode.ADD) {        
      this.todoForm?.reset();        
    }
    
    mode === Mode.READONLY
      ? this.todoForm?.disable()
      : this.todoForm?.enable();
  }

}
