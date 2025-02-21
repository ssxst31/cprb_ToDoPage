import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import { useBoardStore } from '@/hooks/useBoardStore';
import { Todo } from '@/types/Board';
import XMarkIcon from '@/assets/icons/xMark.svg';
import EditableInput from '@/components/EditableCard';

interface TodoCardProps {
  todo: Todo;
  boardId: number;
  index: number;
  isTodoOver: boolean;
  setHoveredTodoIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function TodoCard({ todo, boardId, index, isTodoOver, setHoveredTodoIndex }: TodoCardProps) {
  const { editTodo, deleteTodo } = useBoardStore();

  const [isTodoHovered, setIsTodoHovered] = useState(false);

  useEffect(() => {
    setHoveredTodoIndex(isTodoHovered ? index : null);
  }, [isTodoHovered]);

  const handleDeleteTodo = () => {
    deleteTodo(boardId, todo.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsTodoHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    if (!related || !related.closest('.todo-card')) {
      setIsTodoHovered(false);
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'todo',
    item: { id: todo.id, index, boardId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div onDragEnter={handleDragOver} onDragLeave={handleDragLeave}>
      <div
        className={`bg-white p-2 rounded-md shadow-sm todo-card text-black flex cursor-pointer ${
          isTodoOver || isDragging ? 'opacity-50' : ''
        }`}
        ref={(node) => {
          dragRef(node);
        }}
      >
        <EditableInput
          title={todo.content}
          onEdit={(value: string) => {
            editTodo(boardId, todo.id, value);
          }}
          editIconColor="black"
        />
        <button onClick={handleDeleteTodo}>
          <XMarkIcon width={20} height={20} color="black" />
        </button>
      </div>
    </div>
  );
}
