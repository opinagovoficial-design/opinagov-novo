import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // A Efí envia os eventos de webhook dentro de um array 'pix' ou notificação direta
    const pixEvents = body.pix || [];

    for (const pix of pixEvents) {
      const txid = pix.txid;
      const valor = pix.valor;

      // Aqui o webhook identifica que o Pix foi pago com sucesso
      console.log(`Pix pago com sucesso! TXID: ${txid}, Valor: R$ ${valor}`);

      // 1. Busque no seu banco de dados a cobrança vinculada a este 'txid'.
      // 2. Se a cobrança tiver um 'refCode' (quem indicou), some +1 ponto para essa liderança.
      // 3. Atualize o status do apoio do cidadão para 'pago' / confirmado.
    }

    return NextResponse.json({ success: true, message: "Webhook processado com sucesso" });
  } catch (error: any) {
    console.error("Erro ao processar webhook da Efí:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}