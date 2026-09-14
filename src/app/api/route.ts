import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Chave de serviço para permissão de escrita
);

export async function GET(request: Request) {
  try {
    // Exemplo de atualização direta na tabela candidatos
    const { error } = await supabase
      .from('candidatos')
      .update({ propostas: ['Proposta atualizada via script interno'] })
      .eq('id', 'ID_DO_CANDIDATO'); // Substitua pelo critério desejado

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Dados atualizados com sucesso!' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}