import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todo-node-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
