import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Conexão com o Supabase usando as chaves de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // O banco de pagamento envia um evento quando o Pix é pago
    // Verificamos se o pagamento foi aprovado (ex: status "approved" ou "concluido")
    const statusPagamento = body.status || body.action;

    if (statusPagamento === 'approved' || statusPagamento === 'payment.created') {
      const metadata = body.metadata || body.additional_info || {};
      const candidatoId = metadata.candidato_id || 1; // ID padrão ou enviado na cobrança

      // Busca os votos atuais do candidato no Supabase
      const { data: candidatoAtual, error: erroBusca } = await supabase
        .from('candidatos')
        .select('votos')
        .eq('id', candidatoId)
        .single();

      if (!erroBusca && candidatoAtual) {
        const novosVotos = (candidatoAtual.votos || 0) + 1;

        // Atualiza o banco somando mais um voto validado por Pix
        await supabase
          .from('candidatos')
          .update({ votos: novosVotos })
          .eq('id', candidatoId);
      }
    }

    return NextResponse.json({ recebido: true }, { status: 200 });

  } catch (error) {
    console.error('Erro no processamento do Webhook:', error);
    return NextResponse.json({ erro: 'Erro interno no webhook' }, { status: 500 });
  }
}