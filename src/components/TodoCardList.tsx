import { Todo } from '@/types/Board';
import TodoCard from '@/components/TodoCard';

interface TodoCardListProps {
  todos: Todo[];
  boardId: number;
}

export default function TodoCardList({ todos, boardId }: TodoCardListProps) {
  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} boardId={boardId} />
      ))}
    </div>
  );
}
