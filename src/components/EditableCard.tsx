import { useState } from 'react';

import PencilIcon from '@/assets/icons/pencil.svg';

interface EditableCardProps {
  title: string;
  onEdit: (value: string) => void;
  editIconColor: string;
}

const EditableCard = ({ title, onEdit, editIconColor }: EditableCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onEdit(currentTitle);
    }
  };

  return (
    <div className="group flex justify-between items-center flex-1  h-11">
      {isEditing ? (
        <input
          type="text"
          value={currentTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          onKeyDown={handleKeyDown}
          className="w-full bg-white placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-2 focus:outline-none shadow-sm"
        />
      ) : (
        <h2 className="text-sm font-semibold truncate w-full">{currentTitle}</h2>
      )}
      <button className={`${isEditing ? '' : 'group-hover:block'} hidden px-2 py-1 text-sm cursor-pointer`}>
        <PencilIcon onClick={handleEdit} width={15} height={15} color={editIconColor} />
      </button>
    </div>
  );
};

export default EditableCard;
