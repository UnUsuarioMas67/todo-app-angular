import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/todo-data.type';
import { TodoDataService } from '../../services/todo-data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  tds = inject(TodoDataService);
  registerLinkClicked = output();
  formSubmitted = output();

  loginObj = {
    email: '',
    password: '',
  };
  userNotExists = false;
  incorrectPassword = false;

  onSubmit() {
    const user = this.tds.getUserByEmail(this.loginObj.email);

    this.userNotExists = !user;
    if (!user) return;

    this.incorrectPassword = this.loginObj.password !== user.password;
    if (this.incorrectPassword) {
      this.loginObj.password = '';
      return;
    }

    this.tds.setCurrentUser(user);
    this.formSubmitted.emit();
  }
}
