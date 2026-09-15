import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { valor, candidato, email } = body;

    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: 'Token do Mercado Pago não configurado no servidor' },
        { status: 500 }
      );
    }

    // Cria a cobrança Pix transparente no Mercado Pago
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transaction_amount: Number(valor) || 1.0,
        description: `Apoio - ${candidato || 'OpinaGov'}`,
        payment_method_id: 'pix',
        payer: {
          email: email || 'contato@opinagov.org',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro Mercado Pago:', data);
      return NextResponse.json(
        { error: data.message || 'Erro ao gerar Pix' },
        { status: 400 }
      );
    }

    // Retorna o QR Code e o código Copia e Cola
    return NextResponse.json({
      id: data.id,
      status: data.status,
      qr_code: data.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64,
      ticket_url: data.point_of_interaction?.transaction_data?.ticket_url,
    });
  } catch (error: any) {
    console.error('Erro interno:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar Pix' },
      { status: 500 }
    );
  }
}