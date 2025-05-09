import { NextRequest, NextResponse } from 'next/server';

import { createAuthor, findAllAuthors } from '@/models/authors';

/**
 * Recupera todos os autores da tabela 'authors'.
 *
 * Query Params:
 * - query (opcional): Uma string para filtrar autores pelo nome.
 *
 * Respostas:
 * - 200: Retorna uma lista de autores.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();

    const { data, error } = await findAllAuthors(query);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

/**
 * Cria um novo autor na tabela 'authors'.
 *
 * Corpo da Requisição:
 * - Um objeto JSON contendo os dados do novo autor.
 *
 * Respostas:
 * - 200: Retorna o autor criado com uma mensagem de sucesso.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
export async function POST(request: NextRequest) {
    const newAuthor = await request.json();
    const { data, error } = await createAuthor(newAuthor);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Autor criado com sucesso.' });
}
