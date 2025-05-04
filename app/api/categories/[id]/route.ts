import { NextRequest, NextResponse } from 'next/server';

import {
    deleteCategory,
    findOneCategory,
    updateCategory
} from '@/models/categories';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { data, error } = await findOneCategory(id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Categoria não encontrada.' },
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
    const updatedCategory = await request.json();
    const { data, error } = await updateCategory(id, updatedCategory);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Categoria não encontrada.' },
            { status: 404 }
        );
    }

    return NextResponse.json({
        data,
        message: 'Categoria atualizada com sucesso.'
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { error } = await deleteCategory(id);

    if (error) {
        if (error.code === '23503') {
            return NextResponse.json(
                {
                    error: 'Não é possível excluir a categoria, pois ela está associado a um livro.'
                },
                { status: 400 }
            );
        }

        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Categoria excluída com sucesso.' });
}
