import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', Number(id))
        .single();

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
    const supabase = await createClient();
    const { id } = await params;
    const updatedCategory = await request.json();

    const { data, error } = await supabase
        .from('categories')
        .update(updatedCategory)
        .eq('id', Number(id))
        .select('*')
        .single();

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
    const supabase = await createClient();
    const { id } = await params;

    const { error } = await supabase.from('categories').delete().eq('id', Number(id));

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Categoria excluída com sucesso.' });
}
