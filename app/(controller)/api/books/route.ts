import { NextRequest, NextResponse } from 'next/server';

import { createBook, findAllBooks } from '@/models/books';

/**
 * Recupera todos os livros da tabela 'books'.
 *
 * Query Params:
 * - query (opcional): Uma string para filtrar livros pelo título.
 *
 * Respostas:
 * - 200: Retorna uma lista de livros.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();
    const { data, error } = await findAllBooks(query);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

/**
 * Cria um novo livro na tabela 'books'.
 *
 * Corpo da Requisição:
 * - Um objeto JSON contendo os dados do novo livro.
 *
 * Respostas:
 * - 200: Retorna o livro criado com uma mensagem de sucesso.
 * - 500: Retorna uma mensagem de erro em caso de falha.
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { data, error } = await createBook(body);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Livro criado com sucesso.' });
}
