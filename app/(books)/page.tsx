import Link from 'next/link';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

import BookList from './components/book-list';

export default function BooksPage() {
    return (
        <>
            <div className="sticky top-0 flex w-full items-center gap-2 bg-white p-4">
                <SidebarTrigger />

                <Link href="/form">
                    <Button variant="ghost">
                        <Plus /> Novo livro
                    </Button>
                </Link>
            </div>

            <BookList />
        </>
    );
}
