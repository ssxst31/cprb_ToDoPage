import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Board } from '@/types/Board';

interface BoardStore {
  boards: Board[];
  addBoard: () => void;
  updateBoardTitle: (boardId: number, title: string) => void;
  deleteBoard: (boardId: number) => void;
  addTodo: (boardId: number) => void;
  updateTodoContent: (boardId: number, todoId: number, content: string) => void;
  deleteTodo: (boardId: number, todoId: number) => void;
  reorderBoard: (boardId: number, targetBoardId: number) => void;
  reorderTodo: (boardId: number, targetBoardId: number, todoId: number, newIndex: number | null) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      addBoard: () =>
        set((state) => ({
          boards: [...state.boards, { id: Date.now(), title: '새 보드', todos: [] }],
        })),
      updateBoardTitle: (boardId, title) =>
        set((state) => ({
          boards: state.boards.map((board) => (board.id === boardId ? { ...board, title } : board)),
        })),
      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
        })),
      addTodo: (boardId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? { ...board, todos: [...board.todos, { id: Date.now(), content: '새 할 일' }] }
              : board
          ),
        })),
      updateTodoContent: (boardId, todoId, content) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todos: board.todos.map((todo) => (todo.id === todoId ? { ...todo, content } : todo)),
                }
              : board
          ),
        })),
      deleteTodo: (boardId, todoId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, todos: board.todos.filter((todo) => todo.id !== todoId) } : board
          ),
        })),
      reorderBoard: (boardId, targetBoardId) =>
        set((state) => {
          const boardsCopy = [...state.boards];
          const fromIndex = boardsCopy.findIndex((board) => board.id === boardId);
          const toIndex = boardsCopy.findIndex((board) => board.id === targetBoardId);
          if (fromIndex === -1 || toIndex === -1) return state;

          const [movedBoard] = boardsCopy.splice(fromIndex, 1);
          boardsCopy.splice(toIndex, 0, movedBoard);

          return { boards: boardsCopy };
        }),
      reorderTodo: (sourceBoardId, targetBoardId, todoId, newIndex) =>
        set((state) => {
          const sourceBoard = state.boards.find((board) => board.id === sourceBoardId);
          const targetBoard = state.boards.find((board) => board.id === targetBoardId);
          if (!sourceBoard || !targetBoard) return state;

          const todoIndex = sourceBoard.todos.findIndex((todo) => todo.id === todoId);
          if (todoIndex === -1) return state;

          const [movedTodo] = sourceBoard.todos.splice(todoIndex, 1);
          targetBoard.todos.splice(newIndex ?? targetBoard.todos.length, 0, movedTodo);

          return {
            boards: state.boards.map((board) =>
              board.id === sourceBoardId
                ? { ...board, todos: [...sourceBoard.todos] }
                : board.id === targetBoardId
                ? { ...board, todos: [...targetBoard.todos] }
                : board
            ),
          };
        }),
    }),
    { name: 'boards-storage' }
  )
);
