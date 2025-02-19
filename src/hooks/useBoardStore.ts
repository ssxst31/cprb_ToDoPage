import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Board } from '@/types/Board';

interface BoardStore {
  boards: Board[];
  addBoard: () => void;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
  addTodo: (boardId: number, content: string) => void;
  editTodo: (boardId: number, todoId: string, newContent: string) => void;
  deleteTodo: (boardId: number, todoId: string) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      addBoard: () =>
        set((state) => ({
          boards: [...state.boards, { id: Date.now(), title: '새 보드', todos: [] }],
        })),
      editBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((board) => (board.id === id ? { ...board, title } : board)),
        })),
      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),
      addTodo: (boardId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todos: [...(board.todos || []), { id: Date.now().toString(), content: '새 할 일' }],
                }
              : board
          ),
        })),
      editTodo: (boardId, todoId, newContent) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todos: board.todos?.map((todo) => (todo.id === todoId ? { ...todo, content: newContent } : todo)),
                }
              : board
          ),
        })),
      deleteTodo: (boardId, todoId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todos: board.todos?.filter((todo) => todo.id !== todoId),
                }
              : board
          ),
        })),
    }),
    {
      name: 'boards-storage',
    }
  )
);
