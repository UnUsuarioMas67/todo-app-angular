import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'TaskFlow',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'sign-in',
        title: 'Inicia Sesión - TaskFlow',
        component: LoginFormComponent,
      },
      {
        path: 'sign-up',
        title: 'Crea tu cuenta - TaskFlow',
        component: RegisterFormComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in',
      },
    ],
  },
  {
    path: 'todo',
    title: 'Tus Tareas - TaskFlow',
    component: TodoListComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
