/**
 * Rota para gerenciar categorias com base no ID.
 *
 * Métodos:
 * - GET: Recupera uma categoria específica pelo ID.
 * - PUT: Atualiza os dados de uma categoria existente pelo ID.
 * - DELETE: Exclui uma categoria pelo ID.
 */

import { NextRequest, NextResponse } from 'next/server';

import {
    deleteCategory,
    findOneCategory,
    updateCategory
} from '@/models/categories';

/**
 * Recupera uma categoria específica pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID da categoria a ser recuperada.
 *
 * Respostas:
 * - 200: Retorna os dados da categoria.
 * - 404: Retorna uma mensagem de erro se a categoria não for encontrada.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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

/**
 * Atualiza os dados de uma categoria existente pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID da categoria a ser atualizada.
 *
 * Corpo da Requisição:
 * - Um objeto JSON contendo os novos dados da categoria.
 *
 * Respostas:
 * - 200: Retorna os dados da categoria atualizada.
 * - 404: Retorna uma mensagem de erro se a categoria não for encontrada.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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

/**
 * Exclui uma categoria pelo ID.
 *
 * Parâmetros da URL:
 * - id: O ID da categoria a ser excluída.
 *
 * Respostas:
 * - 200: Retorna uma mensagem de sucesso ao excluir a categoria.
 * - 400: Retorna uma mensagem de erro se a categoria estiver associada a um livro.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
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
