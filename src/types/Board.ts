export interface Todo {
  id: string;
  content: string;
}

export interface Board {
  id: number;
  title: string;
  todos: Todo[];
}
