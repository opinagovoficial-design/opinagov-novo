import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { candidateName, amount = 1.0 } = body

    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN || "APP_USR-759617489299179-091500-6b226b1d2b56a9281533b6ed6ddfddb7-3691454176"

    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Idempotency-Key": `${Date.now()}-${Math.random()}`,
      },
      body: JSON.stringify({
        transaction_amount: Number(amount),
        description: `Apoio Civico Oficial - ${candidateName || "OpinaGov"}`,
        payment_method_id: "pix",
        payer: {
          email: "eleitor.opinagov@gmail.com",
          first_name: "Apoiador",
          last_name: "Civico",
        },
      }),
    })

    const data = await mpRes.json()

    if (data.point_of_interaction?.transaction_data) {
      const { qr_code, qr_code_base64 } = data.point_of_interaction.transaction_data
      return NextResponse.json({
        id: data.id,
        qr_code,
        qr_code_base64: `data:image/png;base64,${qr_code_base64}`,
      })
    }

    return NextResponse.json({ error: "Falha ao gerar Pix", details: data }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
