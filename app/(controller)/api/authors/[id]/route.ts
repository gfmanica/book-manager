import { NextRequest, NextResponse } from 'next/server';

import { deleteAuthor, findOneAuthor, updateAuthor } from '@/models/authors';

/**
 * Recupera um autor específico pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID do autor a ser recuperado.
 *
 * Respostas:
 * - 200: Retorna os dados do autor.
 * - 404: Retorna uma mensagem de erro se o autor não for encontrado.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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

/**
 * Atualiza os dados de um autor existente pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID do autor a ser atualizado.
 *
 * Corpo da Requisição:
 * - Um objeto JSON contendo os novos dados do autor.
 *
 * Respostas:
 * - 200: Retorna os dados do autor atualizado.
 * - 404: Retorna uma mensagem de erro se o autor não for encontrado.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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

/**
 * Exclui um autor pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID do autor a ser excluído.
 *
 * Respostas:
 * - 200: Retorna uma mensagem de sucesso ao excluir o autor.
 * - 400: Retorna uma mensagem de erro se o autor estiver associado a um livro.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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
