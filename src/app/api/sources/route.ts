import { supabaseClient } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabaseClient
        .from('rag_sources')
        .select('*')
        .order('source_id');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
