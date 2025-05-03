import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('id', Number(id))
        .single();

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
    const supabase = await createClient();
    const { id } = await params;
    const updatedAuthor = await request.json();

    // Atualiza o autor no banco de dados
    const { data, error } = await supabase
        .from('authors')
        .update(updatedAuthor)
        .eq('id', Number(id)) // Aplica a atualização ao autor com o id correspondente
        .select('*') // Retorna os dados atualizados
        .single(); // Garante que apenas um resultado seja retornado

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Se não encontrar o autor, retorna erro 404
    if (!data) {
        return NextResponse.json(
            { error: 'Autor não encontrado.' },
            { status: 404 }
        );
    }

    // Retorna os dados do autor atualizado
    return NextResponse.json(data);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // Exclui o autor no banco de dados
    const { data, error } = await supabase
        .from('authors')
        .delete()
        .eq('id', Number(id)); // Aplica a exclusão ao autor com o id correspondente

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Retorna uma resposta indicando que o autor foi excluído com sucesso
    return NextResponse.json({ message: 'Autor excluído com sucesso.' });
}
