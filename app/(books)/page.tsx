import Link from 'next/link';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

import Card from './components/Card';

const books = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        publicationYear: 1925,
        cover: 'https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg',
        description:
            'A novel about the American dream and the roaring twenties.'
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Classic',
        publicationYear: 1960,
        cover: 'https://m.media-amazon.com/images/I/81OdwZG4z+L._AC_UF1000,1000_QL80_.jpg',
        description:
            'A story of racial injustice and moral growth in the American South.'
    },
    {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        category: 'Dystopian',
        publicationYear: 1949,
        cover: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg',
        description:
            'A chilling depiction of a totalitarian regime and surveillance state.'
    },
    {
        id: 4,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        category: 'Romance',
        publicationYear: 1813,
        cover: 'https://m.media-amazon.com/images/I/81VG3FQ2+VL._AC_UF1000,1000_QL80_.jpg',
        description: 'A classic tale of love, class, and societal expectations.'
    },
    {
        id: 5,
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        category: 'Fiction',
        publicationYear: 1951,
        cover: 'https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg',
        description:
            'A story of teenage rebellion and alienation in post-war America. A story of teenage rebellion and alienation in post-war America. A story of teenage rebellion and alienation in post-war America. A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America. A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America. A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America. A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America. vA story of teenage rebellion and alienation in post-war America.A story of teenage rebellion and alienation in post-war America.'
    }
];

export default function Books() {
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

            <div className="grid grid-cols-2 gap-6 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {books.map((book, index) => (
                    <Card key={index} book={book} />
                ))}
            </div>
        </>
    );
}
