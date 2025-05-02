import Link from 'next/link';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Category } from '@/types';

import CategoryCard from './components/CategoryCard';

const categories: Category[] = [
    {
        id: 1,
        name: 'Fiction',
        description: 'Books that contain fictional stories and narratives.'
    },
    {
        id: 2,
        name: 'Non-Fiction',
        description: 'Books based on real facts and information.'
    },
    {
        id: 3,
        name: 'Science',
        description: 'Books that explore scientific topics and discoveries.'
    },
    {
        id: 4,
        name: 'History',
        description: 'Books that delve into historical events and figures.'
    },
    {
        id: 5,
        name: 'Biography',
        description: 'Books that tell the life stories of individuals.'
    }
];

export default function CategoriesPage() {
    return (
        <>
            <div className="sticky top-0 flex w-full items-center gap-2 bg-white p-4">
                <SidebarTrigger />

                <Link href="/form">
                    <Button variant="ghost">
                        <Plus /> Nova categoria
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categories.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                ))}
            </div>
        </>
    );
}
