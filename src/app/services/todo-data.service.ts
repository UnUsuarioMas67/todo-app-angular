import { Injectable } from '@angular/core';
import { Task, User } from '../model/todo-data.type';

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
        title: 'Task #' + i,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id nulla imperdiet, pulvinar mi et, tincidunt nulla.',
        dueDate: new Date('2025-08-13'),
        completed: randomBoolean(),
      });
    }

    const users: Array<User> = [
      {
        name: 'John Johnson',
        email: 'jj666@mail.net',
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

  setCurrentUser(user: User | number) {
    if (typeof user === 'number') {
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
}
