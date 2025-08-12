import { supabaseClient, handleSupabaseError } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from('rag_sources')
      .select('*')
      .order('source_id');

    if (error) {
      const supabaseError = handleSupabaseError(error);
      return NextResponse.json(
        { error: supabaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
