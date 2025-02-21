'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BoardList from '@/components/BoardCardList';

export default function BoardSection() {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex h-screen p-2.5 space-x-2 overflow-x-scroll bg-gray-200 text-white">
        <BoardList />
      </section>
    </DndProvider>
  );
}
