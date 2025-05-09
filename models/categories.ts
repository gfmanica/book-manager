import { createClient } from '@/lib/supabase';

/**
 * Recupera todas as categorias da tabela 'categories'.
 * Pode filtrar os resultados com base em uma consulta opcional.
 * @param query - Uma string para filtrar categorias pelo nome.
 * @returns Uma lista de categorias que correspondem à consulta.
 */
export async function findAllCategories(query?: string) {
    const supabase = await createClient();
    let supabaseQuery = supabase.from('categories').select();

    if (query) {
        supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    return await supabaseQuery;
}

/**
 * Recupera uma única categoria com base no ID fornecido.
 * @param id - O ID da categoria a ser recuperada.
 * @returns A categoria correspondente ao ID ou um erro se não encontrada.
 */
export async function findOneCategory(id: string) {
    const supabase = await createClient();

    return await supabase
        .from('categories')
        .select()
        .eq('id', Number(id))
        .single();
}

/**
 * Cria uma nova categoria na tabela 'categories'.
 * @param category - Um objeto contendo os dados da categoria a ser criada.
 * @returns A categoria recém-criada.
 */
export async function createCategory(category: any) {
    const supabase = await createClient();

    return await supabase
        .from('categories')
        .insert([category])
        .select()
        .single();
}

/**
 * Atualiza os dados de uma categoria existente com base no ID fornecido.
 * @param id - O ID da categoria a ser atualizada.
 * @param category - Um objeto contendo os novos dados da categoria.
 * @returns A categoria atualizada.
 */
export async function updateCategory(id: string, category: any) {
    const supabase = await createClient();

    return await supabase
        .from('categories')
        .update(category)
        .eq('id', Number(id))
        .select()
        .single();
}

/**
 * Exclui uma categoria da tabela 'categories' com base no ID fornecido.
 * @param id - O ID da categoria a ser excluída.
 * @returns O resultado da operação de exclusão.
 */
export async function deleteCategory(id: string) {
    const supabase = await createClient();

    return await supabase.from('categories').delete().eq('id', Number(id));
}
