import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "자습ON",
  description: "무인 자습실을 위한 출결, 좌석, 학습 리포트 운영 자동화",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
