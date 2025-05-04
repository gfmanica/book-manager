'use client';

import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/loader';
import { Axios } from '@/lib/axios';
import { Category } from '@/types';

import CategoryCard from './category-card';

export default function CategoryList() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const { data, isFetching } = useQuery<Category[]>({
        queryKey: ['categories', query],
        queryFn: () =>
            Axios.get(`/categories${query ? `?query=${query}` : ''}`).then(
                (res) => res.data
            ),
        initialData: []
    });

    if (isFetching) return <Loading />;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((category, index) => (
                <CategoryCard key={index} category={category} />
            ))}

            {data.length === 0 && (
                <div className="col-span-full text-center">
                    Nenhuma categoria encontrada.
                </div>
            )}
        </div>
    );
}
