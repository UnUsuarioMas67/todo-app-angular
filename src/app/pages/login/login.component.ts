import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TodoDataService } from '../../services/todo-data.service';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  tds = inject(TodoDataService);
}
