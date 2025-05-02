import Link from 'next/link';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Author } from '@/types';

import AuthorCard from './components/AuthorCard';

const authors: Author[] = [
    {
        id: 1,
        name: 'Gabriel García Márquez',
        biography:
            'Colombian novelist, short-story writer, screenwriter, and journalist.'
    },
    {
        id: 2,
        name: 'Jane Austen',
        biography: 'English novelist known for her six major novels.'
    },
    {
        id: 3,
        name: 'George Orwell',
        biography: 'English novelist, essayist, journalist, and critic.'
    },
    {
        id: 4,
        name: 'Toni Morrison',
        biography: 'American novelist, essayist, editor, and professor.'
    },
    {
        id: 5,
        name: 'Haruki Murakami',
        biography:
            'Japanese writer known for his surreal and melancholic works.'
    }
];

export default function AuthorPage() {
    // const { data, isLoading } = useQuery<Author[]>({
    //     queryKey: ['authors'],
    //     queryFn: () => Axios.get(`/authors`).then((res) => res.data.data),
    //     initialData: []
    // });

    // if (isLoading) return <Loading />;

    return (
        <>
            <div className="sticky top-0 flex w-full items-center gap-2 bg-white p-4">
                <SidebarTrigger />

                <Link href="/form">
                    <Button variant="ghost">
                        <Plus /> Novo autor
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {authors.map((author, index) => (
                    <AuthorCard key={index} author={author} />
                ))}
            </div>
        </>
    );
}
