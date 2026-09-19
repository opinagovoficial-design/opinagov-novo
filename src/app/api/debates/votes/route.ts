import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "src", "lib", "debate-votes.json");

function getVotes() {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (e) {
    console.error("Erro ao ler votos de debate:", e);
  }
  return {};
}

function saveVotes(data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Erro ao gravar votos de debate:", e);
  }
}

export async function GET() {
  return NextResponse.json(getVotes());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { debateId, yesVotes, noVotes } = body;

    if (!debateId) {
      return NextResponse.json({ error: "ID do debate é obrigatório" }, { status: 400 });
    }

    const current = getVotes();
    current[debateId] = {
      yes: Number(yesVotes) || 0,
      no: Number(noVotes) || 0
    };

    saveVotes(current);
    return NextResponse.json({ success: true, votes: current });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao salvar votos" }, { status: 500 });
  }
}
