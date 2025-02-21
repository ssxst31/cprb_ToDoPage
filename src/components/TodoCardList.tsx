import { Todo } from '@/types/Board';
import TodoCard from '@/components/TodoCard';

interface TodoCardListProps {
  todos: Todo[];
  boardId: number;
  isTodoOver: boolean;
  setHoveredTodoIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function TodoCardList({ todos, boardId, isTodoOver, setHoveredTodoIndex }: TodoCardListProps) {
  return (
    <div className="flex flex-col gap-2 ">
      {todos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          boardId={boardId}
          index={index}
          isTodoOver={isTodoOver}
          setHoveredTodoIndex={setHoveredTodoIndex}
        />
      ))}
    </div>
  );
}
