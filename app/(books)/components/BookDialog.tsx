import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Book } from '@/types';

export default function BookDialog({
    book,
    isOpen,
    onClose
}: {
    book: Book;
    isOpen: boolean;
    onClose: (value: boolean) => void;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="h-[90%] max-w-[90%] overflow-scroll sm:h-auto sm:max-h-[70%] sm:max-w-[70%]">
                <DialogHeader>
                    <DialogTitle>{book.title}</DialogTitle>

                    <DialogDescription>{book.author}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-start gap-4 self-center sm:flex-row">
                    <img
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="h-64 self-center rounded-md object-cover sm:self-auto md:h-128"
                    />
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">{book.category}</p>

                        <p className="text-sm text-gray-500">
                            {book.publicationYear}
                        </p>

                        <p className="text-sm text-gray-700">
                            {book.description}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
