import { NextRequest, NextResponse } from 'next/server';

import { createAuthor, findAllAuthors } from '@/models/authors';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();

    const { data, error } = await findAllAuthors(query);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const newAuthor = await request.json();
    const { data, error } = await createAuthor(newAuthor);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Autor criado com sucesso.' });
}
