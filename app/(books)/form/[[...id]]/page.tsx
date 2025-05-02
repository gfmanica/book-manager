import BookForm from './BookForm';

export default async function BooksFormPage({
    params
}: {
    params: Promise<{ id?: string }>;
}) {
    const { id } = await params;
    return <BookForm id={id} />;
}
