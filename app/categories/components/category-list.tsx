'use client';

import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/loader';
import { Axios } from '@/lib/axios';
import { Category } from '@/types';

import CategoryCard from './category-card';

export default function CategoryList() {
    const { data, isFetching } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => Axios.get(`/categories`).then((res) => res.data),
        initialData: []
    });

    if (isFetching) return <Loading />;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 pt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map((category, index) => (
                <CategoryCard key={index} category={category} />
            ))}
        </div>
    );
}
