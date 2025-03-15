import { Component, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddTaskData } from '../../model/todo-data.type';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-task-form',
  imports: [FormsModule],
  templateUrl: './new-task-form.component.html',
  styleUrl: './new-task-form.component.scss',
})
export class NewTaskFormComponent {
  modal = input.required<NgbActiveModal>();
  formSubmitted = output<AddTaskData>();
  formResult = {
    title: '',
    description: '',
    date: '',
    time: '',
  };

  OnSubmit() {
    this.formSubmitted.emit(this.formResult);

    this.formResult = {
      title: '',
      description: '',
      date: '',
      time: '',
    };

    this.modal().close();
  }
}
