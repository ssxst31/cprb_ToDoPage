import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Board } from '@/types/Board';

interface BoardStore {
  boards: Board[];
  addBoard: () => void;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      addBoard: () =>
        set((state) => ({
          boards: [...state.boards, { id: Date.now(), title: '새 보드' }],
        })),
      editBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((board) => (board.id === id ? { ...board, title } : board)),
        })),
      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),
    }),
    {
      name: 'boards-storage',
    }
  )
);
