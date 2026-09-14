import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cpf, valor, tipoProduto, idReferencia } = body;

    if (!cpf || !valor) {
      return NextResponse.json(
        { erro: 'CPF e Valor são obrigatórios para emissão do Pix.' },
        { status: 400 }
      );
    }

    const mockCopiaECola = `00020126580014br.gov.bcb.pix0136opinagov@suaempresa.com.br520400005303986540${valor.length > 1 ? valor : `0${valor}`}5802BR5913OpinaGov Ltda6009Sao Paulo62070503***6304ABCD`;
    const txidGerado = `OPINAGOV${Date.now()}`;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      sucesso: true,
      copiaECola: mockCopiaECola,
      txid: txidGerado,
      mensagem: 'Pix gerado com sucesso. Aguardando pagamento.'
    });

  } catch (error) {
    console.error('Erro na API de Pix:', error);
    return NextResponse.json(
      { erro: 'Falha interna ao comunicar com o servidor de pagamentos.' },
      { status: 500 }
    );
  }
}