import { NextRequest, NextResponse } from 'next/server';

import { createCategory, findAllCategories } from '@/models/categories';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase();
    const { data, error } = await findAllCategories(query);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

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
