import { Injectable } from '@angular/core';
import { AddTaskData, Task, User } from '../model/todo-data.type';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  usersKey = 'todo-users';
  currentUserKey = 'todo-user-id';

  users: Array<User> = [];

  constructor() {
    this.loadUserList();
  }

  createUserList(): Array<User> {
    const tasks: Array<Task> = [];
    const randomBoolean = () => {
      const random = Math.random();
      return random < 0.5 ? true : false;
    };

    for (let i = 0; i < 10; i++) {
      tasks.push({
        id: i,
        title: 'Tarea #' + i,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id nulla imperdiet, pulvinar mi et, tincidunt nulla.',
        dueDate: new Date('2025-08-13'),
        completed: randomBoolean(),
      });
    }

    const users: Array<User> = [
      {
        name: 'Juan Jiménez',
        email: 'prueba123@email.com',
        password: '1234',
        tasks,
      },
    ];

    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return users;
  }

  saveUserList(users?: Array<User>) {
    if (users) {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
      return;
    }

    localStorage.setItem(this.usersKey, JSON.stringify(this.users));
  }

  loadUserList() {
    if (!localStorage.getItem(this.usersKey)) {
      this.users = this.createUserList();
    }

    let json = localStorage.getItem(this.usersKey)!;
    this.users = JSON.parse(json);
  }

  getUserByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }

  addUser(email: string, name: string, password: string) {
    if (this.getUserByEmail(email)) return false;

    this.users.push({
      email,
      name,
      password,
      tasks: [],
    });

    this.saveUserList();
    return true;
  }

  setCurrentUser(user: User | string) {
    if (typeof user === 'string') {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return;
    }

    localStorage.setItem(this.currentUserKey, JSON.stringify(user.email));
  }

  getCurrentUser() {
    const json = localStorage.getItem(this.currentUserKey);
    if (!json) return null;

    const userEmail: string = JSON.parse(json);
    return this.users.find((u) => u.email === userEmail) || null;
  }

  addTask(data: AddTaskData) {
    const user = this.getCurrentUser();
    if (!user) return;

    const lastId = user.tasks.length
      ? user.tasks.reduce((prev, current) =>
          current.id > prev.id ? current : prev
        ).id
      : 0;

    const task: Task = {
      id: lastId + 1,
      title: data.title,
      description: data.description,
      dueDate: new Date(`${data.date} ${data.time}`),
      completed: false,
    };

    user.tasks.push(task);
    this.saveUserList();
  }

  updateTask(next: Task) {
    const user = this.getCurrentUser();
    if (!user) return;

    user.tasks = user.tasks.map((t) => {
      if (t.id === next.id) return next;
      return t;
    });

    this.saveUserList();
  }

  deleteTask(taskId: number) {
    const user = this.getCurrentUser();
    if (!user) return;

    user.tasks = user.tasks.filter((t) => t.id !== taskId);

    this.saveUserList();
  }
}
