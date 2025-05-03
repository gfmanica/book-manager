import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import AppSidebar from '@/components/app-sidebar';
import Providers from '@/contexts';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Book Manager',
    description: 'Book Manager is a simple app to manage your books.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    <AppSidebar />

                    <main className="flex h-dvh w-full flex-col">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
