import Link from 'next/link';

import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

import AuthorList from './components/author-list';
import SearchInput from '@/components/search-input';

export default function AuthorPage() {
    return (
        <>
            <div className="sticky top-0 flex w-full items-center gap-2 bg-white p-4">
                <SidebarTrigger />

                <Link href="/authors/form">
                    <Button variant="ghost">
                        <Plus /> Novo autor
                    </Button>
                </Link>

                <SearchInput placeholder='Pesquisar autor...' />
            </div>

            <AuthorList />
        </>
    );
}
