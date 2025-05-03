import CategoryForm from './category-form';

export default async function CategoryFormPage({
    params
}: {
    params: Promise<{ id?: string }>;
}) {
    const { id } = await params;

    return <CategoryForm id={id} />;
}
