import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('books')
        .select('*, authors(*), categories(*)');

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
