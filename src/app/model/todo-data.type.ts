export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  tasks: Array<Task>;
};
