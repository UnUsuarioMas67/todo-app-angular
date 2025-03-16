import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-header',
  imports: [NgbCollapseModule, NgbDropdownModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  tds = inject(TodoDataService);

  isMenuCollapsed = signal(true);
  userName = signal('--');

  ngOnInit(): void {
    const user = this.tds.getCurrentUser();
    if (!user) return;

    this.userName.set(user.name);
  }
}
