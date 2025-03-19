import { Component, input, OnInit, output } from '@angular/core';
import { Task } from '../../model/todo-data.type';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-task',
  imports: [NgClass, DatePipe],
  templateUrl: './todo-task.component.html',
  styleUrl: './todo-task.component.scss',
})
export class TodoTaskComponent implements OnInit {
  task = input.required<Task>();
  checkClicked = output<Task>();
  deleteClicked = output<Task>();
  expired = false;

  ngOnInit(): void {
    this.expired =
      new Date().getTime() > new Date(this.task().dueDate).getTime();
  }
}
