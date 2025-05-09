import { NextRequest, NextResponse } from 'next/server';

import { deleteBook, findOneBook, updateBook } from '@/models/books';

/**
 * Recupera um livro específico pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID do livro a ser recuperado.
 *
 * Respostas:
 * - 200: Retorna os dados do livro.
 * - 404: Retorna uma mensagem de erro se o livro não for encontrado.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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

/**
 * Atualiza os dados de um livro existente pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID do livro a ser atualizado.
 *
 * Corpo da Requisição:
 * - Um objeto JSON contendo os novos dados do livro.
 *
 * Respostas:
 * - 200: Retorna os dados do livro atualizado.
 * - 404: Retorna uma mensagem de erro se o livro não for encontrado.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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

/**
 * Exclui um livro pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID do livro a ser excluído.
 *
 * Respostas:
 * - 200: Retorna uma mensagem de sucesso ao excluir o livro.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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
