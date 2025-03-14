import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  loginLinkClicked = output();
  formSubmitted = output();
  tds = inject(TodoDataService);

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
