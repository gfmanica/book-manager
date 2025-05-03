'use client';

import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/loader';
import { Axios } from '@/lib/axios';
import { Author } from '@/types';

import AuthorCard from './author-card';

export default function AuthorList() {
    const { data, isFetching } = useQuery<Author[]>({
        queryKey: ['authors'],
        queryFn: () => Axios.get(`/authors`).then((res) => res.data),
        initialData: []
    });

    if (isFetching) return <Loading />;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((author, index) => (
                <AuthorCard key={index} author={author} />
            ))}
        </div>
    );
}
