'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                {children}
                <Toaster position="bottom-left" theme="light" richColors />
            </SidebarProvider>
        </QueryClientProvider>
    );
}
