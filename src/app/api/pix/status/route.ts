import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get("id")

  if (!paymentId) {
    return NextResponse.json({ error: "ID do pagamento obrigatório." }, { status: 400 })
  }

  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN

  if (!token) {
    // Modo de demonstração / homologação local se não houver token configurado
    return NextResponse.json({ status: "pending", approved: false })
  }

  try {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao consultar status no banco." }, { status: 502 })
    }

    const data = await res.json()
    const isApproved = data.status === "approved"

    return NextResponse.json({
      status: data.status,
      approved: isApproved,
    })
  } catch {
    return NextResponse.json({ error: "Falha de comunicação com gateway." }, { status: 500 })
  }
}
