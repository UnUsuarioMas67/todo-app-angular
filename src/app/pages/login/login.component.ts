import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  tds = inject(TodoDataService);
}
