'use client';

import BoardList from '@/components/BoardCardList';

export default function BoardSection() {
  return (
    <section className="flex h-screen p-2.5 space-x-2 overflow-x-scroll bg-gray-200 text-white">
      <BoardList />
    </section>
  );
}
