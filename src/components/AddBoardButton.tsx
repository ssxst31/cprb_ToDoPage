import { useBoardStore } from '@/hooks/useBoardStore';

export default function AddBoardButton() {
  const { addBoard } = useBoardStore();

  return (
    <button
      className="h-11 text-gray-700 text-sm bg-gray-300 rounded-md p-2.5 min-w-72 flex justify-between items-center"
      onClick={addBoard}
    >
      새 보드 추가
    </button>
  );
}
