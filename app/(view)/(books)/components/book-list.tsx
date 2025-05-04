'use client';

import Loading from '@/components/loader';
import useListController from '@/hooks/use-list-controller';
import { Book } from '@/types';

import BookCard from './book-card';

export default function BookList() {
    const { data, isFetching } = useListController<Book>({
        endpoint: '/books'
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
