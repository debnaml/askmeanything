import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ask Me Anything",
  description: "AI-powered Q&A landing page",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
