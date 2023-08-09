'use client'
import type { Metadata } from "next";
import emailContext from "@/Context/emailContext";
import "./globals.css";

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang='en'>
      <emailContext.Provider value={{ email: '' }}>
        <body>{children}</body>
      </emailContext.Provider>
    </html >
  );
}
