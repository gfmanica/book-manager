'use client';

import Loading from '@/components/loader';
import useListController from '@/hooks/use-list-controller';
import { Author } from '@/types';

import AuthorCard from './author-card';

export default function AuthorList() {
    const { data, isFetching } = useListController<Author>({
        endpoint: '/authors'
    });

    if (isFetching) return <Loading />;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((author, index) => (
                <AuthorCard key={index} author={author} />
            ))}

            {data.length === 0 && (
                <div className="col-span-full text-center">
                    Nenhum autor encontrado.
                </div>
            )}
        </div>
    );
}
