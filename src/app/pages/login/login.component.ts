import { Component, inject, signal } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';
import { TodoDataService } from '../../services/todo-data.service';
import { User } from '../../model/todo-data.type';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  tds = inject(TodoDataService);
  isRegistering = signal(false);

  OnLogin() {
    this.router.navigateByUrl('/todo');
  }

  OnRegister() {
    this.isRegistering.set(false);
  }
}
