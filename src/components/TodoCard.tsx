import { useBoardStore } from '@/hooks/useBoardStore';
import { Todo } from '@/types/Board';
import XMarkIcon from '@/assets/icons/xMark.svg';
import EditableInput from '@/components/EditableCard';

interface TodoCardListProps {
  todo: Todo;
  boardId: number;
}

export default function TodoCard({ todo, boardId }: TodoCardListProps) {
  const { editTodo, deleteTodo } = useBoardStore();

  const handleDeleteTodo = () => {
    deleteTodo(boardId, todo.id);
  };

  return (
    <div className="bg-white p-2 rounded-md shadow-sm text-black flex">
      <EditableInput
        title={todo.content}
        onEdit={(value: string) => {
          console.log('value', value);
          editTodo(boardId, todo.id, value);
        }}
        editIconColor="black"
      />
      <button onClick={handleDeleteTodo}>
        <XMarkIcon width={20} height={20} color="black" />
      </button>
    </div>
  );
}
