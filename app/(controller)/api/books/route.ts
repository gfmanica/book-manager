import { NextRequest, NextResponse } from 'next/server';

import { createBook, findAllBooks } from '@/models/books';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();
    const { data, error } = await findAllBooks(query);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { data, error } = await createBook(body);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Livro criado com sucesso.' });
}
