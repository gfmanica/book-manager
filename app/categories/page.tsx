import Link from 'next/link';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

import CategoryList from './components/category-list';

export default function CategoriesPage() {
    return (
        <>
            <div className="sticky top-0 flex w-full items-center gap-2 bg-white p-4">
                <SidebarTrigger />

                <Link href="/categories/form">
                    <Button variant="ghost">
                        <Plus /> Nova categoria
                    </Button>
                </Link>
            </div>

            <CategoryList />
        </>
    );
}
