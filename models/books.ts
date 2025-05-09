import { createClient } from '@/lib/supabase';

/**
 * Recupera todos os livros da tabela 'books'.
 * Inclui informações relacionadas de autores e categorias.
 * Pode filtrar os resultados com base em uma consulta opcional.
 * @param query - Uma string para filtrar livros pelo título.
 * @returns Uma lista de livros que correspondem à consulta.
 */
export async function findAllBooks(query?: string) {
    const supabase = await createClient();
    let supabaseQuery = supabase
        .from('books')
        .select('*, authors!inner(*), categories(*)');

    if (query) {
        supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
    }

    return await supabaseQuery.then(({ data, ...args }) => {
        return {
            data: data?.map((book) => ({
                ...book,
                author: book.authors,
                category: book.categories,
                publicationYear: book.publication_year,
                authors: undefined,
                categories: undefined
            })),
            ...args
        };
    });
}

/**
 * Recupera um único livro com base no ID fornecido.
 * Inclui informações relacionadas de autores e categorias.
 * @param id - O ID do livro a ser recuperado.
 * @returns O livro correspondente ao ID ou um erro se não encontrado.
 */
export async function findOneBook(id: string) {
    const supabase = await createClient();

    return await supabase
        .from('books')
        .select('*, authors(*), categories(*)')
        .eq('id', Number(id))
        .single()
        .then(({ data, ...args }) => {
            if (!data) {
                return {
                    data,
                    ...args
                };
            }

            return {
                data: {
                    ...data,
                    author: data.authors,
                    category: data.categories,
                    authors: undefined,
                    categories: undefined,
                    publicationYear: data.publication_year
                },
                ...args
            };
        });
}

/**
 * Cria um novo livro na tabela 'books'.
 * @param body - Um objeto contendo os dados do livro a ser criado.
 * @returns O livro recém-criado.
 */
export async function createBook(body: any) {
    const supabase = await createClient();

    const newBook = {
        author_id: body.author.id,
        category_id: body.category.id,
        cover: body.cover,
        description: body.description,
        publication_year: body.publicationYear,
        title: body.title
    };

    return await supabase.from('books').insert([newBook]).select().single();
}

/**
 * Atualiza os dados de um livro existente com base no ID fornecido.
 * @param id - O ID do livro a ser atualizado.
 * @param body - Um objeto contendo os novos dados do livro.
 * @returns O livro atualizado.
 */
export async function updateBook(id: string, body: any) {
    const supabase = await createClient();

    const updatedBook = {
        id: body.id,
        author_id: body.author.id,
        category_id: body.category.id,
        cover: body.cover,
        description: body.description,
        publication_year: body.publicationYear,
        title: body.title
    };

    return await supabase
        .from('books')
        .update(updatedBook)
        .eq('id', Number(id))
        .select()
        .single();
}

/**
 * Exclui um livro da tabela 'books' com base no ID fornecido.
 * @param id - O ID do livro a ser excluído.
 * @returns O resultado da operação de exclusão.
 */
export async function deleteBook(id: string) {
    const supabase = await createClient();

    return await supabase.from('books').delete().eq('id', Number(id));
}
