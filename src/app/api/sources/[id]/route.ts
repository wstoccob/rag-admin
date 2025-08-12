import { supabaseClient, handleSupabaseError } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { editSourceSchema } from '@/lib/validation';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validate the request body
    const validationResult = editSourceSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.message
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseClient
      .from('rag_sources')
      .update(validationResult.data)
      .eq('source_id', params.id)
      .select();

    if (error) {
      const supabaseError = handleSupabaseError(error);
      return NextResponse.json(
        { error: supabaseError.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Source not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating source:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
