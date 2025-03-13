import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [NgbCollapseModule, NgbDropdownModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuCollapsed = signal(true);
  userName = input('username');
}
