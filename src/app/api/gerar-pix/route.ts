import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(req: Request) {
  try {
    const { valor, candidatoNome } = await req.json();

    const token = process.env.MERCADOPAGO_ACCESS_TOKEN || "APP_USR-6776100155239106-031215-68045f492b45fcf30f81fe80b95ebc98-1726715694";
    const client = new MercadoPagoConfig({ accessToken: token });
    const payment = new Payment(client);

    const body = {
      transaction_amount: Number(valor) || 1.0,
      description: `Apoio Oficial OpinaGov - ${candidatoNome || "Candidato"}`,
      payment_method_id: "pix",
      payer: {
        email: "apoio@opinagov.com.br",
      },
    };

    const response = await payment.create({ body });

    return NextResponse.json({
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  } catch (error: any) {
    console.error("Erro na criacao do Pix:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
