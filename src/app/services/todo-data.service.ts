import { Injectable } from '@angular/core';
import { Task, User } from '../model/todo-data.type';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  localStorageKey = 'todo-users';

  createLocalStorageItem() {
    const users = [
      {
        id: 0,
        name: 'John Johnson',
        email: 'jj666@mail.net',
        tasks: [],
      },
    ];

    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  setLocalStorageItem(users: Array<User>) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  getAllUsers(): Array<User> {
    if (!localStorage.getItem(this.localStorageKey)) {
      this.createLocalStorageItem();
    }

    let json = localStorage.getItem(this.localStorageKey)!;
    return JSON.parse(json);
  }

  getUserByEmail(email: string) {
    const users = this.getAllUsers();
    return users.find((u) => u.email === email);
  }

  getTask(user: User, id: number) {
    return user.tasks.find((t) => t.id === id);
  }

  addUser(email: string, name: string) {
    const users = this.getAllUsers();
    const lastId = users.reduce((previous, current) =>
      current.id > previous.id ? current : previous
    ).id;

    users.push({
      id: lastId + 1,
      email,
      name,
      tasks: [],
    });

    this.setLocalStorageItem(users);
  }
}
