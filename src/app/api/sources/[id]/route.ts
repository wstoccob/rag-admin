import { supabaseClient } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();

        const { data, error } = await supabaseClient
            .from('rag_sources')
            .update(body)
            .eq('source_id', params.id)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
