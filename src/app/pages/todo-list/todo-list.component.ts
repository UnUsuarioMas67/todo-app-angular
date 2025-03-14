import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Task } from '../../model/todo-data.type';
import { TodoDataService } from '../../services/todo-data.service';
import { TodoTaskComponent } from '../../components/todo-task/todo-task.component';

@Component({
  selector: 'app-todo-list',
  imports: [HeaderComponent, TodoTaskComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  tds = inject(TodoDataService);
  tasks = signal<Array<Task>>([]);
  userName = signal('');

  ngOnInit(): void {
    const user = this.tds.getCurrentUser();
    if (!user) return;

    this.userName.set(user.name);
    this.tasks.set(user.tasks);
  }
}
