import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AddTaskData, Task } from '../../model/todo-data.type';
import { TodoDataService } from '../../services/todo-data.service';
import { TodoTaskComponent } from '../../components/todo-task/todo-task.component';
import { NewTaskFormComponent } from '../../components/new-task-form/new-task-form.component';

@Component({
  selector: 'app-todo-list',
  imports: [HeaderComponent, TodoTaskComponent, NewTaskFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  tds = inject(TodoDataService);
  user = this.tds.getCurrentUser();

  tasks = signal<Array<Task>>([]);
  userName = signal('');

  ngOnInit(): void {
    if (!this.user) return;

    this.userName.set(this.user.name);
    this.tasks.set(this.user.tasks);
  }

  onFormSubmit(data: AddTaskData) {
    this.tds.addTask(data);
  }

  onTaskCheckClicked(task: Task) {
    task.completed = !task.completed;
    this.tds.updateTask(task);
  }
}
