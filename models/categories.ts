import { createClient } from '@/lib/supabase';

export async function findAllCategories(query?: string) {
    const supabase = await createClient();
    let supabaseQuery = supabase.from('categories').select();

    if (query) {
        supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    return await supabaseQuery;
}

export async function findOneCategory(id: string) {
    const supabase = await createClient();

    return await supabase
        .from('categories')
        .select('*')
        .eq('id', Number(id))
        .single();
}

export async function createCategory(category: any) {
    const supabase = await createClient();

    return await supabase.from('categories').insert([category]).select().single();
}

export async function updateCategory(id: string, category: any) {
    const supabase = await createClient();

    return await supabase
        .from('categories')
        .update(category)
        .eq('id', Number(id))
        .select()
        .single();
}

export async function deleteCategory(id: string) {
    const supabase = await createClient();

    return await supabase.from('categories').delete().eq('id', Number(id));
}
