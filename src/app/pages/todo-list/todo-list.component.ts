import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AddTaskData, Task } from '../../model/todo-data.type';
import { TodoDataService } from '../../services/todo-data.service';
import { TodoTaskComponent } from '../../components/todo-task/todo-task.component';
import { NewTaskFormComponent } from '../../components/new-task-form/new-task-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-todo-list',
  imports: [
    HeaderComponent,
    TodoTaskComponent,
    NewTaskFormComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  tds = inject(TodoDataService);
  modalService = inject(NgbModal);
  user = this.tds.getCurrentUser();

  tasks = signal<Array<Task>>([]);

  statusValues: Array<[status: CompletionStatus, text: string]> = [
    ['all', 'Todas'],
    ['pending', 'Pendientes'],
    ['completed', 'Completadas'],
  ];

  searchFilter = signal('');
  statusFilter = signal<CompletionStatus>('all');

  ngOnInit(): void {
    if (!this.user) return;

    this.tasks.set(this.user.tasks);
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  onFormSubmit(data: AddTaskData) {
    this.tds.addTask(data);
    this.tasks.set(this.user!.tasks);
  }

  onTaskCheckClick(task: Task) {
    this.tds.updateTask({ ...task, completed: !task.completed });
    this.tasks.set(this.user!.tasks);
  }

  onTaskDeleteClick(task: Task) {
    this.tds.deleteTask(task.id);
    this.tasks.set(this.user!.tasks);
  }

  matchesSearch(task: Task, search: string) {
    if (!search) return true;
    return task.title.toLowerCase().includes(search.toLowerCase());
  }

  matchesStatus(task: Task, status: CompletionStatus) {
    switch (status) {
      case 'all':
        return true;
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
    }
  }
}

type CompletionStatus = 'all' | 'pending' | 'completed';
