import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase.from('categories').select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const newAuthor = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categories')
        .insert([newAuthor])
        .select('*')
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Categoria criada com sucesso.' });
}
