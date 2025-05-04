import { createClient } from '@/lib/supabase';

export async function findAllBooks(query?: string) {
    const supabase = await createClient();
    let supabaseQuery = supabase
        .from('books')
        .select('*, authors!inner(*), categories(*)');

    if (query) {
        supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
    }

    return await supabaseQuery.then(({ data, ...args }) => {
        return {
            data: data?.map((book) => ({
                ...book,
                author: book.authors,
                category: book.categories,
                publicationYear: book.publication_year,
                authors: undefined,
                categories: undefined
            })),
            ...args
        };
    });
}

export async function findOneBook(id: string) {
    const supabase = await createClient();

    return await supabase
        .from('books')
        .select('*, authors(*), categories(*)')
        .eq('id', Number(id))
        .single()
        .then(({ data, ...args }) => {
            if (!data) {
                return {
                    data,
                    ...args
                };
            }

            return {
                data: {
                    ...data,
                    author: data.authors,
                    category: data.categories,
                    authors: undefined,
                    categories: undefined,
                    publicationYear: data.publication_year
                },
                ...args
            };
        });
}

export async function createBook(body: any) {
    const supabase = await createClient();

    const newBook = {
        author_id: body.author.id,
        category_id: body.category.id,
        cover: body.cover,
        description: body.description,
        publication_year: body.publicationYear,
        title: body.title
    };

    return await supabase.from('books').insert([newBook]).select().single();
}

export async function updateBook(id: string, body: any) {
    const supabase = await createClient();

    const updatedBook = {
        id: body.id,
        author_id: body.author.id,
        category_id: body.category.id,
        cover: body.cover,
        description: body.description,
        publication_year: body.publicationYear,
        title: body.title
    };

    return await supabase
        .from('books')
        .update(updatedBook)
        .eq('id', Number(id))
        .select()
        .single();
}

export async function deleteBook(id: string) {
    const supabase = await createClient();

    return await supabase.from('books').delete().eq('id', Number(id));
}
