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
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'a',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'b',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'c',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'd',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'e',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'f',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'g',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'h',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'i',
            },
            {
                name: 'dupa',
                additionalDetails: 'dupa details',
                completed: false,
                lastModified: '12/03/2021',
                deadline: '31/03/2021',
                id: 'j',
            }
        ]);
    }
}
