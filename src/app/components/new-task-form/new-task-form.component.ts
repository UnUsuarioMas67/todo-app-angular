import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddTaskData } from '../../model/todo-data.type';

@Component({
  selector: 'app-new-task-form',
  imports: [FormsModule],
  templateUrl: './new-task-form.component.html',
  styleUrl: './new-task-form.component.scss',
})
export class NewTaskFormComponent {
  formSubmitted = output<AddTaskData>();
  formResult = {
    title: '',
    description: '',
    date: '',
    time: '',
  };

  OnSubmit() {
    this.formSubmitted.emit(this.formResult);
  }
}
