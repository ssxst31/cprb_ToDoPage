import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Board } from '@/types/Board';

interface BoardStore {
  boards: Board[];
  addBoard: () => void;
  editBoard: (id: number, title: string) => void;
  deleteBoard: (id: number) => void;
  addTodo: (boardId: number) => void;
  editTodo: (boardId: number, todoId: number, newContent: string) => void;
  deleteTodo: (boardId: number, todoId: number) => void;
  moveBoard: (id: number, targetId: number) => void;
  moveTodo: (id: number, targetBoardId: number, todoId: number, newIndex: number | null) => void;
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
                  todos: [...(board.todos || []), { id: Date.now(), content: '새 할 일' }],
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
      moveBoard: (id, targetId) =>
        set((state) => {
          const boardIndex = state.boards.findIndex((board) => board.id === id);
          const targetIndex = state.boards.findIndex((board) => board.id === targetId);

          const boardsCopy = [...state.boards];

          const [movedBoard] = boardsCopy.splice(boardIndex, 1);
          boardsCopy.splice(targetIndex, 0, movedBoard);

          return { boards: boardsCopy };
        }),
      moveTodo: (id, targetBoardId, todoId, newIndex) =>
        set((state) => {
          const sourceBoard = state.boards.find((b) => b.id === id);
          const targetBoard = state.boards.find((b) => b.id === targetBoardId);
          if (!sourceBoard || !targetBoard) return state;

          if (id === targetBoardId) {
            const todoIndex = sourceBoard.todos.findIndex((todo) => todo.id === todoId);
            if (todoIndex === -1) return state;

            const todosCopy = [...sourceBoard.todos];
            const [movedTodo] = todosCopy.splice(todoIndex, 1);
            todosCopy.splice(newIndex ?? todosCopy.length, 0, movedTodo);

            return {
              boards: state.boards.map((b) => (b.id === id ? { ...b, todos: todosCopy } : b)),
            };
          }

          const todoIndex = sourceBoard.todos.findIndex((todo) => todo.id === todoId);
          if (todoIndex === -1) return state;

          const [movedTodo] = sourceBoard.todos.splice(todoIndex, 1);

          const updatedTargetTodos = [...targetBoard.todos];
          updatedTargetTodos.splice(newIndex ?? updatedTargetTodos.length, 0, movedTodo);

          return {
            boards: state.boards.map((board) =>
              board.id === id
                ? { ...board, todos: [...sourceBoard.todos] }
                : board.id === targetBoardId
                ? { ...board, todos: updatedTargetTodos }
                : board
            ),
          };
        }),
    }),
    {
      name: 'boards-storage',
    }
  )
);
