import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
const filePath = path.join(process.cwd(), "src", "lib", "duels-data.json");

function readDuels() {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  return [];
}

function writeDuels(data: any[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  return NextResponse.json(readDuels());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let duels = readDuels();

    // Criar nova pergunta / duelo
    if (body.action === "create" || (!body.action && body.title)) {
      const newDuelo = {
        id: "duel-" + Date.now(),
        category: body.category || "GERAL",
        title: body.title,
        votesYes: Number(body.votesYes) || 0,
        votesNo: Number(body.votesNo) || 0,
        active: true
      };
      duels = [newDuelo, ...duels];
      writeDuels(duels);
      return NextResponse.json({ success: true, duel: newDuelo, duels });
    }

    // Atualizar votos
    if (body.action === "update_votes") {
      duels = duels.map((d: any) => {
        if (d.id === body.duelId || String(d.title).toLowerCase().includes(String(body.duelId).toLowerCase())) {
          return {
            ...d,
            votesYes: Number(body.votesYes) || 0,
            votesNo: Number(body.votesNo) || 0
          };
        }
        return d;
      });
      writeDuels(duels);
      return NextResponse.json({ success: true, duels });
    }

    // Excluir duelo
    if (body.action === "delete") {
      duels = duels.filter((d: any) => d.id !== body.duelId);
      writeDuels(duels);
      return NextResponse.json({ success: true, duels });
    }

    return NextResponse.json({ success: true, duels });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
