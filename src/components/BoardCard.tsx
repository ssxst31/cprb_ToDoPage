import { Board } from '@/types/Board';
import TrashIcon from '@/assets/icons/trash.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import TodoCardList from '@/components/TodoCardList';
import EditableInput from '@/components/EditableCard';

interface BoardCardProps {
  board: Board;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
  addTodo: (boardId: number) => void;
}

const BoardCard = ({ board, editBoard, deleteBoard, addTodo }: BoardCardProps) => {
  const handleAddTodo = () => {
    addTodo(board.id);
  };

  return (
    <div className="min-w-72 justify-between items-center rounded-m max-w-48 flex flex-col">
      <div className="flex bg-blue-900 px-2 rounded-md justify-between items-center w-full">
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
              deleteBoard(board.id);
            }}
          >
            <TrashIcon width={20} height={20} color="#FA2C37" />
          </button>
        </div>
      </div>
      <div className="mt-2 space-y-2 overflow-y-scroll flex-1 w-full">
        <TodoCardList boardId={board.id} todos={board.todos} />
      </div>
    </div>
  );
};

export default BoardCard;
