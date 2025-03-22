import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoDataService } from '../../services/todo-data.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list-header',
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './todo-list-header.component.html',
  styleUrl: './todo-list-header.component.scss',
})
export class TodoListHeaderComponent implements OnInit {
  tds = inject(TodoDataService);
  userName = signal<string>('-');

  ngOnInit(): void {
    const user = this.tds.getCurrentUser();
    if (!user) return;

    this.userName.set(user.name);
  }
}
