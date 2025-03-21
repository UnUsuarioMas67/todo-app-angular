import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoDataService } from '../../services/todo-data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  tds = inject(TodoDataService);
  router = inject(Router);

  emailAlreadyExists = signal(false);

  signUpObj = {
    name: '',
    email: '',
    password: '',
    acceptedTerms: false,
  };

  onSubmit() {
    this.emailAlreadyExists.set(
      !!this.tds.getUserByEmail(this.signUpObj.email)
    );

    const result = this.tds.addUser(
      this.signUpObj.email,
      this.signUpObj.name,
      this.signUpObj.password
    );

    if (!result) return;

    this.signUpObj = {
      name: '',
      email: '',
      password: '',
      acceptedTerms: false,
    };

    this.tds.setCurrentUser(result);
    this.router.navigateByUrl('/todo');
  }
}
