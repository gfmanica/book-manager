'use client';

import CardActions from '@/components/card-actions';
import { Category } from '@/types';

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <div className="overflow-hidden rounded-lg border bg-white shadow-md">
            <div className="p-4">
                <h2 className="truncate text-lg font-semibold">
                    {category.name}
                </h2>

                <p className="line-clamp-1 text-sm text-gray-600">
                    {category.description}
                </p>
            </div>

            <CardActions
                editRoute={`/form/${category.id}`}
                deleteRoute={`/form/${category.id}`}
            />
        </div>
    );
}
