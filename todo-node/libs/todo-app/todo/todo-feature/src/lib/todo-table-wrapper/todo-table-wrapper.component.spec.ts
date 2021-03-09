import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTableWrapperComponent } from './todo-table-wrapper.component';

describe('TodoTableWrapperComponent', () => {
  let component: TodoTableWrapperComponent;
  let fixture: ComponentFixture<TodoTableWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoTableWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTableWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
