import AuthorForm from './author-form';

export default async function AuthorFormPage({
    params
}: {
    params: Promise<{ id?: string }>;
}) {
    const { id } = await params;
    return <AuthorForm id={id} />;
}
