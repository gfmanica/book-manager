import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase.from('categories').select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
