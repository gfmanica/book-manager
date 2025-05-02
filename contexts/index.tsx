'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider } from '@/components/ui/sidebar';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>{children}</SidebarProvider>
        </QueryClientProvider>
    );
}
