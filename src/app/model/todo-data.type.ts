export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
};

export type User = {
  name: string;
  email: string;
  password: string;
  tasks: Array<Task>;
};

export type AddTaskData = {
  title: string;
  description: string;
  date: string;
  time: string;
};
