import BoardCard from '@/components/BoardCard';
import { useBoardStore } from '@/hooks/useBoardStore';
import AddBoardButton from '@/components/AddBoardButton';

export default function BoardCardList() {
  const { boards, editBoard, deleteBoard } = useBoardStore();

  return (
    <>
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} editBoard={editBoard} deleteBoard={deleteBoard} />
      ))}
      <AddBoardButton />
    </>
  );
}
