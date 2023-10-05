import '@/styles/globals.css'
import type { Metadata } from 'next'
import { getServerSession } from "next-auth";
import { Roboto } from 'next/font/google';
import { redirect } from "next/navigation";
import React from "react";


const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
});


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

interface LayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
const session = await getServerSession();

  if (session) {
      redirect('/');
  }

  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        {children}
      </body>
    </html>
  )
}