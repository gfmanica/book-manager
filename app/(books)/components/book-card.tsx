'use client';

import { useState } from 'react';

import Tooltip from '@/components/tooltip';
import { Book } from '@/types';

import CardActions from '../../../components/card-actions';
import BookDialog from './book-dialog';

export default function BookCard({ book }: { book: Book }) {
    const [openBookDialog, setOpenBookDialog] = useState(false);

    return (
        <>
            <BookDialog
                book={book}
                isOpen={openBookDialog}
                onClose={(value) => setOpenBookDialog(value)}
            />

            <div className="overflow-hidden rounded-lg border bg-white shadow-md transition-transform duration-200 ease-in-out hover:scale-101">
                <Tooltip text="Clique para ver mais detalhes">
                    <div
                        className="cursor-pointer"
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
                    </div>
                </Tooltip>

                <CardActions
                    queryKey="books"
                    editRoute={`/form/${book.id}`}
                    deleteRoute={`/books/${book.id}`}
                />
            </div>
        </>
    );
}
