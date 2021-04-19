//Angular imports
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

//libs imports
import { Mode, Task } from '@todo-node/shared/utils';
import { SaveTaskEvent } from '@todo-node/todo-app/todo/domain';


@Component({
  selector: 'node-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {

  @Input() formVisible: boolean;
  @Input() formMode: Mode;
  @Input() task: Task;
  @Output() saveTask: EventEmitter<SaveTaskEvent> = new EventEmitter<SaveTaskEvent>();
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
      this.onModeChange();
    }

    if(changes.task && changes.task.currentValue) {
      this.patchForm();
    }
  }

  ngOnInit(): void {
    this.buildForm();    
  }

  /** 
   * * Tells the parent to close form dialog.
   * * Clears the form on dialog close if formMode === ADD.
   */
  public hideDialog(): void {
    this.patchForm();
    this.dialogClosed.emit();
  }

  /** 
   * * Tells the parent to save form values to the store.
   * * Clears the form (if in ADD mode) and closes dialog.
  */
  public submit(): void {
    if(this.todoForm.valid) {
      this.saveTask.emit(this.buildPayload());
      this.patchForm();
      this.dialogClosed.emit();
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
  private onModeChange(): void {
    this.patchForm();
    
    this.formMode === Mode.READONLY
      ? this.todoForm?.disable()
      : this.todoForm?.enable();
  }

  /**
   * * Patches form based on the @Input values. 
   * * Clears the form with default values if formMode === ADD.
   * * Otherwise sets form value to the current task @Input
   * */
  private patchForm(): void {
    if(this.formMode === Mode.ADD) {        
      //primeNG dialog is not destroyed on close
      //so we have to reset form when in ADD mode      
      this.todoForm?.reset({ completed: false });   
    } else {
      //hack to get p-calendar working corretly with object literals and dates
      const newFormValue = { ...this.task, deadline: new Date(this.task.deadline) };
      this.todoForm.patchValue(newFormValue);
    }
  }

  /** Builds payload to be emitted to the parent on form submission. */
  private buildPayload(): SaveTaskEvent {
    return {
      task: {
        ...this.todoForm.value,
        //hack to get p-calendar working correctly with object literals and dates
        deadline: new Date(this.deadline.value),
        id: this.formMode === Mode.ADD ? undefined : this.task?.id
      },
      action: this.formMode
    }
  }

}
