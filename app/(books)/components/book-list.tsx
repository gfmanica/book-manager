'use client';

import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/loader';
import { Axios } from '@/lib/axios';
import { Book } from '@/types';

import BookCard from './book-card';

export default function BookList() {
    const { data, isLoading } = useQuery<Book[]>({
        queryKey: ['books'],
        queryFn: () => Axios.get(`/books`).then((res) => res.data),
        initialData: []
    });

    console.log(data);
    if (isLoading) return <Loading />;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((book, index) => (
                <BookCard key={index} book={book} />
            ))}
        </div>
    );
}
