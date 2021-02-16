//Angular imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

//libs imports
import { MenuItem, PrimeIcons } from 'primeng/api';


@Component({
    selector: 'todo-node-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public items: MenuItem[];

    constructor() {}

    ngOnInit(): void {
        this.initializeManuItems();
    }

    private initializeManuItems(): void {
        this.items = [
            { label: 'Home', icon: PrimeIcons.HOME },
            { label: 'Todos', icon: PrimeIcons.PENCIL },
            { label: 'About', icon: PrimeIcons.QUESTION_CIRCLE }
        ];
    }
}
