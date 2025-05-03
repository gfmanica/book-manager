import Link from 'next/link';

import { BookMarked, Component, UserRound } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

const items = [
    {
        title: 'Livros',
        url: '/',
        icon: BookMarked
    },
    {
        title: 'Categorias',
        url: '/categories',
        icon: Component
    },
    {
        title: 'Autores',
        url: '/authors',
        icon: UserRound
    }
];

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="pb-0">
                <h1 className="py-2 text-center text-2xl font-bold">
                    Book Manager
                </h1>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="pt-0">
                    <SidebarGroupLabel>Páginas</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />

                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
