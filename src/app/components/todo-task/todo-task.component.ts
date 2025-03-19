import { Component, input, OnInit, output, signal } from '@angular/core';
import { Task } from '../../model/todo-data.type';
import { DatePipe, formatDate, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-task',
  imports: [NgClass, DatePipe, FormsModule],
  templateUrl: './todo-task.component.html',
  styleUrl: './todo-task.component.scss',
})
export class TodoTaskComponent implements OnInit {
  task = input.required<Task>();

  checkClicked = output<Task>();
  deleteClicked = output<Task>();
  editConfirmed = output<Task>();

  editing = signal<boolean>(false);
  editObj = {
    title: '',
    description: '',
    date: '',
    time: '',
  };

  getNewEditObj() {
    return {
      title: this.task().title,
      description: this.task().description,
      date: formatDate(this.task().dueDate, 'yyyy-MM-dd', 'en-US'),
      time: formatDate(this.task().dueDate, 'hh:mm', 'en-US'),
    };
  }

  ngOnInit(): void {
    this.editObj = this.getNewEditObj();
  }

  onEditClick() {
    this.editing.set(true);
  }

  onConfirmClick() {
    this.editing.set(false);
    this.editConfirmed.emit({
      ...this.task(),
      title: this.editObj.title,
      description: this.editObj.description,
      dueDate: new Date(`${this.editObj.date} ${this.editObj.time}`),
    });
  }

  onCancelClick() {
    this.editing.set(false);
    this.editObj = this.getNewEditObj();
  }
}
