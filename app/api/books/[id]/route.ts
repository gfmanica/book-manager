import { NextRequest, NextResponse } from 'next/server';

import { deleteBook, findOneBook, updateBook } from '@/models/books';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { data, error } = await findOneBook(id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Livro não encontrado.' },
            { status: 404 }
        );
    }

    return NextResponse.json(data);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const { data, error } = await updateBook(id, body);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Livro não encontrado.' },
            { status: 404 }
        );
    }

    return NextResponse.json({
        data,
        message: 'Livro atualizado com sucesso.'
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { error } = await deleteBook(id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Livro excluído com sucesso.' });
}
