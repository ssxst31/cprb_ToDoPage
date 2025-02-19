import type { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '칸반보드',
  description: '칸반보드입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
