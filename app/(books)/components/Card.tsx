'use client';

import { useState } from 'react';

import { Book } from '@/types';

import BookDialog from './BookDialog';
import CardActions from './CardActions';

export default function Card({ book }: { book: Book }) {
    const [openBookDialog, setOpenBookDialog] = useState(false);

    return (
        <>
            <BookDialog
                book={book}
                isOpen={openBookDialog}
                onClose={(value) => setOpenBookDialog(value)}
            />

            <div
                className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-transform duration-200 ease-in-out hover:scale-101"
                onClick={() => setOpenBookDialog(true)}
            >
                <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    className="h-32 w-full object-cover md:h-48"
                />

                <div className="p-4">
                    <h2 className="truncate text-lg font-semibold">
                        {book.title}
                    </h2>

                    <p className="truncate text-sm text-gray-600">
                        {book.author}
                    </p>

                    <p className="truncate text-sm text-gray-500">
                        {book.category}
                    </p>

                    <p className="text-sm text-gray-500">
                        {book.publicationYear}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm">
                        {book.description}
                    </p>
                </div>

                <CardActions />
            </div>
        </>
    );
}
