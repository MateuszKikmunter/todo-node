//Angular imports
import { Component, OnInit } from '@angular/core';

//libs imports
import { Observable, of } from 'rxjs';
import { Task } from '@todo-node/shared/utils';
import { TodoFacadeService } from '@todo-node/todo-app/todo/data-access';

@Component({
    selector: 'todo-table-wrapper',
    templateUrl: './todo-table-wrapper.component.html',
    styleUrls: ['./todo-table-wrapper.component.scss'],
})
export class TodoTableWrapperComponent implements OnInit {
    public tasks$: Observable<Task[]>;

    constructor(private todoFacade: TodoFacadeService) {}

    ngOnInit(): void {
        this.tasks$ = of([
            {
                name: 'learn some node and nestjs development',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '11/03/2021',
                deadline: '25/05/2021',
                id: 'a',
            },
            {
                name: 'buy milk',
                additionalDetails: 'buy some whole milk for cereal',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'b',
            },
            {
                name: 'become jedi master',
                additionalDetails: 'STAR WARS!',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'c',
            },
            {
                name: 'watch out, zombies!',
                additionalDetails: 'braaains!',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'd',
            },
            {
                name: 'hello world!',
                additionalDetails: 'whats up?',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'e',
            },
            {
                name: 'typescript',
                additionalDetails: 'ts is cool',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'f',
            },
            {
                name: 'JS',
                additionalDetails: 'JavaScript',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'g',
            },
            {
                name: 'blah',
                additionalDetails: 'blah details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'h',
            },
            {
                name: 'Im Batman!',
                additionalDetails: 'Batman would kick Supermans ass!',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'i',
            },
            {
                name: 'trololololololo',
                additionalDetails: 'singining Russian guy',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'j',
            }
        ]);
    }
}
