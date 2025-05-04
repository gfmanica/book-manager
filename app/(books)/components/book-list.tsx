'use client';

import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/loader';
import { Axios } from '@/lib/axios';
import { Book } from '@/types';

import BookCard from './book-card';

export default function BookList() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const { data, isFetching } = useQuery<Book[]>({
        queryKey: ['books', query],
        queryFn: () =>
            Axios.get(`/books${query ? `?query=${query}` : ''}`).then(
                (res) => res.data
            ),
        initialData: []
    });

    if (isFetching) return <Loading />;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((book, index) => (
                <BookCard key={index} book={book} />
            ))}
            {data.length === 0 && (
                <div className="col-span-full text-center">
                    Nenhum livro encontrado.
                </div>
            )}
        </div>
    );
}
