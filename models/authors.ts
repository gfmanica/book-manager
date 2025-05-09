import { createClient } from '@/lib/supabase';

/**
 * Recupera todos os autores da tabela 'authors'.
 * Pode filtrar os resultados com base em uma consulta opcional.
 * @param query - Uma string para filtrar autores pelo nome.
 * @returns Uma lista de autores que correspondem à consulta.
 */
export async function findAllAuthors(query?: string) {
    const supabase = await createClient();
    let supabaseQuery = supabase.from('authors').select();

    if (query) {
        supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    return await supabaseQuery;
}

/**
 * Recupera um único autor com base no ID fornecido.
 * @param id - O ID do autor a ser recuperado.
 * @returns O autor correspondente ao ID ou um erro se não encontrado.
 */
export async function findOneAuthor(id: string) {
    const supabase = await createClient();

    return await supabase
        .from('authors')
        .select('*')
        .eq('id', Number(id))
        .single();
}

/**
 * Cria um novo autor na tabela 'authors'.
 * @param author - Um objeto contendo os dados do autor a ser criado.
 * @returns O autor recém-criado.
 */
export async function createAuthor(author: any) {
    const supabase = await createClient();

    return await supabase.from('authors').insert([author]).select().single();
}

/**
 * Atualiza os dados de um autor existente com base no ID fornecido.
 * @param id - O ID do autor a ser atualizado.
 * @param author - Um objeto contendo os novos dados do autor.
 * @returns O autor atualizado.
 */
export async function updateAuthor(id: string, author: any) {
    const supabase = await createClient();

    return await supabase
        .from('authors')
        .update(author)
        .eq('id', Number(id))
        .select()
        .single();
}

/**
 * Exclui um autor da tabela 'authors' com base no ID fornecido.
 * @param id - O ID do autor a ser excluído.
 * @returns O resultado da operação de exclusão.
 */
export async function deleteAuthor(id: string) {
    const supabase = await createClient();

    return await supabase.from('authors').delete().eq('id', Number(id));
}
