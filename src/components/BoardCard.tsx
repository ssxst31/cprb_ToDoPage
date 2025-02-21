import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Board } from '@/types/Board';
import TrashIcon from '@/assets/icons/trash.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import TodoCardList from '@/components/TodoCardList';
import EditableInput from '@/components/EditableCard';
import { useBoardStore } from '@/hooks/useBoardStore';

interface BoardCardProps {
  board: Board;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const { editBoard, deleteBoard, addTodo, moveBoard, moveTodo } = useBoardStore();

  const [hoveredTodoIndex, setHoveredTodoIndex] = useState<number | null>(null);

  const handleAddTodo = () => {
    addTodo(board.id);
  };

  const [, boardDragRef] = useDrag(() => ({
    type: 'board',
    item: { id: board.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isBoardOver }, boardDropRef] = useDrop(() => ({
    accept: 'board',
    drop: (item: { id: number }) => {
      moveBoard(item.id, board.id);
    },
    collect: (monitor) => ({
      isBoardOver: monitor.isOver(),
    }),
  }));

  const [{ isTodoOver }, todoDropRef] = useDrop({
    accept: 'todo',
    drop(item: { id: number; boardId: number; index: number }) {
      moveTodo(item.boardId, board.id, item.id, hoveredTodoIndex);
    },
    collect: (monitor) => ({
      isTodoOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => {
        boardDragRef(node);
        boardDropRef(node);
        todoDropRef(node);
      }}
      className={`min-w-72 justify-between items-center rounded-m max-w-48 flex flex-col ${
        isBoardOver ? 'opacity-50' : ''
      }`}
    >
      <div className="flex bg-blue-900 px-2 rounded-md justify-between items-center w-full cursor-pointer">
        <EditableInput
          title={board.title}
          onEdit={(value: string) => {
            editBoard(board.id, value);
          }}
          editIconColor="white"
        />
        <div className="flex space-x-2">
          <button onClick={handleAddTodo}>
            <PlusIcon width={20} height={20} color="white" />
          </button>
          <button
            onClick={() => {
              if (window.confirm('해당 보드를 삭제하시겠습니까?')) {
                deleteBoard(board.id);
              }
            }}
          >
            <TrashIcon width={20} height={20} color="#FA2C37" />
          </button>
        </div>
      </div>
      <div className="mt-2 space-y-2 overflow-y-scroll flex-1 w-full">
        <TodoCardList
          boardId={board.id}
          todos={board.todos}
          isTodoOver={isTodoOver}
          setHoveredTodoIndex={setHoveredTodoIndex}
        />
      </div>
    </div>
  );
};

export default BoardCard;
