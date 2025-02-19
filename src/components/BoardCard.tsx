import { useState } from 'react';
import Image from 'next/image';

import { Board } from '@/types/Board';
import Icons from '@/assets/icons';

interface BoardCardProps {
  board: Board;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
}

const BoardCard = ({ board, editBoard, deleteBoard }: BoardCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      editBoard(board.id, title);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleBlur = () => {
    setIsEditing(false);
    editBoard(board.id, title);
  };

  return (
    <div className="min-w-72 h-11 p-2 bg-blue-900 flex justify-between items-center rounded-md">
      <div className="group flex justify-between items-center flex-1 max-w-[200px]">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full bg-white placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-2 focus:outline-none shadow-sm"
          />
        ) : (
          <h2 className="text-sm font-semibold truncate w-full">{title}</h2>
        )}
        <Image
          src={Icons.PencilIcon}
          width={30}
          className={`${isEditing ? '' : 'group-hover:block'} hidden px-2 py-1 text-sm cursor-pointer`}
          onClick={handleEdit}
          alt="보드 편집"
        />
      </div>
      <div className="flex space-x-2">
        <button>
          <Image src={Icons.PlusIcon} width={15} alt="보드 추가" />
        </button>
        <button>
          <Image
            src={Icons.TrashIcon}
            width={15}
            alt="보드 삭제"
            onClick={() => {
              deleteBoard(board.id);
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
