import { NextRequest, NextResponse } from 'next/server';

import { deleteAuthor, findOneAuthor, updateAuthor } from '@/models/authors';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { data, error } = await findOneAuthor(id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Autor não encontrado.' },
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
    const updatedAuthor = await request.json();
    const { data, error } = await updateAuthor(id, updatedAuthor);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Autor não encontrado.' },
            { status: 404 }
        );
    }

    return NextResponse.json({
        data,
        message: 'Autor atualizado com sucesso.'
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { error } = await deleteAuthor(id);

    if (error) {
        if (error.code === '23503') {
            return NextResponse.json(
                {
                    error: 'Não é possível excluir o autor, pois ele está associado a um livro.'
                },
                { status: 400 }
            );
        }

        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Autor excluído com sucesso.' });
}
