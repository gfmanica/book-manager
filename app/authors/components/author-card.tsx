'use client';

import { Author, Book } from '@/types';

import AuthorCardActions from './author-card-actions';

export default function AuthorCard({ author }: { author: Author }) {
    return (
        <div className="overflow-hidden rounded-lg border bg-white shadow-md">
            <div className="p-4">
                <h2 className="truncate text-lg font-semibold">
                    {author.name}
                </h2>

                <p className="line-clamp-2 text-sm text-gray-600">
                    {author.biography}
                </p>
            </div>

            <AuthorCardActions />
        </div>
    );
}
