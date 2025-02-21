export interface Todo {
  id: number;
  content: string;
}

export interface Board {
  id: number;
  title: string;
  todos: Todo[];
}
