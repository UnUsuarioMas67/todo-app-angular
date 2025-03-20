import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoDataService } from '../../services/todo-data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  loginLinkClicked = output();
  formSubmitted = output();
  tds = inject(TodoDataService);

  emailAlreadyExists = signal(false);

  signUpObj = {
    name: '',
    email: '',
    password: '',
    acceptedTerms: false,
  };

  onSubmit() {
    const result = this.tds.addUser(
      this.signUpObj.email,
      this.signUpObj.name,
      this.signUpObj.password
    );

    this.emailAlreadyExists.set(
      !!this.tds.getUserByEmail(this.signUpObj.email)
    );

    if (!result) return;

    this.formSubmitted.emit();

    this.signUpObj = {
      name: '',
      email: '',
      password: '',
      acceptedTerms: false,
    };
  }
}
