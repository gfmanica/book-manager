import { NextRequest, NextResponse } from 'next/server';

import { createCategory, findAllCategories } from '@/models/categories';

/**
 * Recupera todas as categorias da tabela 'categories'.
 *
 * Query Params:
 * - query (opcional): Uma string para filtrar categorias pelo nome.
 *
 * Respostas:
 * - 200: Retorna uma lista de categorias.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();
    const { data, error } = await findAllCategories(query);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

/**
 * Cria uma nova categoria na tabela 'categories'.
 *
 * Corpo da Requisição:
 * - Um objeto JSON contendo os dados da nova categoria.
 *
 * Respostas:
 * - 200: Retorna a categoria criada com uma mensagem de sucesso.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
export async function POST(request: NextRequest) {
    const newCategory = await request.json();
    const { data, error } = await createCategory(newCategory);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        data,
        message: 'Categoria criada com sucesso.'
    });
}
