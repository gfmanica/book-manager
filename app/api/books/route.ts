import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();

    let supabaseQuery = supabase
        .from('books')
        .select('*, authors!inner(*), categories(*)');

    if (query) {
        supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
    }

    const { data, error } = await supabaseQuery;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const transformed = data.map((book) => ({
        ...book,
        author: book.authors,
        category: book.categories,
        authors: undefined,
        categories: undefined
    }));

    return NextResponse.json(transformed);
}

// export async function GET() {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//         .from('books')
//         .select('*, authors(*), categories(*)');

//     if (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     const transformed = data.map((book) => ({
//         ...book,
//         author: book.authors,
//         category: book.categories,
//         authors: undefined,
//         categories: undefined
//     }));

//     return NextResponse.json(transformed);
// }

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const body = await request.json();

    const newBook = {
        author_id: body.author.id,
        category_id: body.category.id,
        cover: body.cover,
        description: body.description,
        publication_year: body.publicationYear,
        title: body.title
    };

    const { data, error } = await supabase
        .from('books')
        .insert([newBook])
        .select('*')
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Livro criado com sucesso.' });
}
