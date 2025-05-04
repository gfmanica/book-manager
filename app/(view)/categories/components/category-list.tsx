'use client';

import Loading from '@/components/loader';
import useListController from '@/hooks/use-list-controller';
import { Category } from '@/types';

import CategoryCard from './category-card';

export default function CategoryList() {
    const { data, isFetching } = useListController<Category>({
        endpoint: '/categories'
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
