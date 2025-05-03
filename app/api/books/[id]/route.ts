import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('books')
        .select('*, authors(*), categories(*)')
        .eq('id', Number(id))
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Livro não encontrado.' },
            { status: 404 }
        );
    }

    const transformed = {
        ...data,
        author: data.authors,
        category: data.categories,
        authors: undefined,
        categories: undefined
    };

    return NextResponse.json(transformed);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    const updatedBook = {
        id: body.id,
        author_id: body.author.id,
        category_id: body.category.id,
        cover: body.cover,
        description: body.description,
        publication_year: body.publicationYear,
        title: body.title
    };

    const { data, error } = await supabase
        .from('books')
        .update(updatedBook)
        .eq('id', Number(id))
        .select('*')
        .single();

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
    const supabase = await createClient();
    const { id } = await params;

    const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', Number(id));

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Livro excluído com sucesso.' });
}
