import { Component, inject, output } from '@angular/core';
import { FormsModule, FormSubmittedEvent } from '@angular/forms';
import { User } from '../../model/todo-data.type';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  tds = inject(TodoDataService);
  registerLinkClicked = output();
  formSubmitted = output<User>();

  userNotExists = false;
  emailValue = '';

  formFilled() {
    return !!this.emailValue;
  }

  onSubmit() {
    const user = this.tds.getUserByEmail(this.emailValue);
    this.emailValue = '';

    if (!user) {
      this.userNotExists = true;
      return;
    }

    this.formSubmitted.emit(user);
    this.userNotExists = false;
  }
}
