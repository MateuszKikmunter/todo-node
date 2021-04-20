//Angular imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//libs imports
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';


@Component({
    selector: 'todo-node-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public items: MenuItem[];

    constructor(readonly authFacade: AuthFacadeService,
        private router: Router) {}

    ngOnInit(): void {
        this.initializeManuItems();
    }

    /** Log out the user and navigate to login screen. */
    public logout(): void {
        this.authFacade.logout();
        this.router.navigateByUrl('/account/login');
    }

    /** Initializes menu items displayed in the menu. */
    private initializeManuItems(): void {
        this.items = [
            { label: 'Home', icon: PrimeIcons.HOME },
            { label: 'Todos', icon: PrimeIcons.PENCIL },
            { label: 'About', icon: PrimeIcons.QUESTION_CIRCLE }
        ];
    }
}
