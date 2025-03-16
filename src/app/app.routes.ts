import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'todo',
    component: TodoListComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
