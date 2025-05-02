import { Book } from '@/types';

import CardActions from './CardActions';

export default function Card({ book }: { book: Book }) {
    return (
        <div className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-transform duration-200 ease-in-out hover:scale-101">
            <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="h-48 w-full object-cover"
            />

            <div className="p-4">
                <h2 className="text-lg font-semibold">{book.title}</h2>

                <p className="text-sm text-gray-600">{book.author}</p>

                <p className="text-sm text-gray-500">{book.category}</p>

                <p className="text-sm text-gray-500">
                    Publicado: {book.publicationYear}
                </p>

                <p className="mt-2 text-sm">{book.description}</p>
            </div>

            <CardActions />
        </div>
    );
}
