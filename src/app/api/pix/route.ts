import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const amount = Number(body.amount) || 1.0
    const description = body.description || "Auditoria Civica - OpinaGov"
    const payerEmail = body.email || "eleitor@opinagov.com.br"

    const token =
      process.env.MERCADO_PAGO_ACCESS_TOKEN ||
      process.env.MERCADOPAGO_ACCESS_TOKEN ||
      ""

    if (!token) {
      return NextResponse.json(
        { error: "Token do gateway não configurado nas variáveis de ambiente." },
        { status: 500 }
      )
    }

    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Idempotency-Key": `voto-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      },
      body: JSON.stringify({
        transaction_amount: amount,
        description: description,
        payment_method_id: "pix",
        payer: {
          email: payerEmail,
          first_name: "Eleitor",
          last_name: "Auditado",
        },
      }),
    })

    const data = await mpResponse.json()

    if (!mpResponse.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao comunicar com Mercado Pago" },
        { status: 400 }
      )
    }

    const txData = data.point_of_interaction?.transaction_data

    return NextResponse.json({
      paymentId: data.id,
      status: data.status,
      qrCode: txData?.qr_code,
      qrCodeBase64: txData?.qr_code_base64,
      ticketUrl: txData?.ticket_url,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Falha interna ao gerar cobrança Pix" },
      { status: 500 }
    )
  }
}
