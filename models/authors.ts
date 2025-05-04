import { createClient } from '@/lib/supabase';

export async function findAllAuthors(query?: string) {
    const supabase = await createClient();
    let supabaseQuery = supabase.from('authors').select();

    if (query) {
        supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    return await supabaseQuery;
}

export async function findOneAuthor(id: string) {
    const supabase = await createClient();

    return await supabase
        .from('authors')
        .select('*')
        .eq('id', Number(id))
        .single();
}

export async function createAuthor(author: any) {
    const supabase = await createClient();

    return await supabase.from('authors').insert([author]).select().single();
}

export async function updateAuthor(id: string, author: any) {
    const supabase = await createClient();

    return await supabase
        .from('authors')
        .update(author)
        .eq('id', Number(id))
        .select()
        .single();
}

export async function deleteAuthor(id: string) {
    const supabase = await createClient();

    return await supabase.from('authors').delete().eq('id', Number(id));
}
