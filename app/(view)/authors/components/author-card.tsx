'use client';

import CardActions from '@/components/card-actions';
import { Author } from '@/types';

export default function AuthorCard({ author }: { author: Author }) {
    return (
        <div className="overflow-hidden rounded-lg border bg-white shadow-md">
            <div className="h-20 p-4">
                <h2 className="truncate text-lg font-semibold">
                    {author.name}
                </h2>

                <p className="line-clamp-2 text-sm text-gray-600">
                    {author.biography}
                </p>
            </div>

            <CardActions
                queryKey="/authors"
                editRoute={`/authors/form/${author.id}`}
                deleteRoute={`/authors/${author.id}`}
            />
        </div>
    );
}
