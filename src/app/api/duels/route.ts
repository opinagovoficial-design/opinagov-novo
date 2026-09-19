import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "src", "lib", "duels-data.json");

function readDuels(): any[] {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(raw);
      if (Array.isArray(data)) return data;
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
    let current = readDuels();

    // 1. Atualização mestre de votos por ID ou correspondência de título
    if (body.action === "update_votes") {
      let found = false;
      current = current.map((d: any) => {
        if (d.id === body.duelId || (body.duelId && String(d.title).toLowerCase().includes(String(body.duelId).toLowerCase()))) {
          found = true;
          return {
            ...d,
            votesYes: Number(body.votesYes) || 0,
            votesNo: Number(body.votesNo) || 0
          };
        }
        return d;
      });

      // Se não encontrou por ID, cria ou sincroniza o registro
      if (!found && body.duelId) {
        current.push({
          id: body.duelId,
          category: "GERAL",
          title: body.title || body.duelId,
          votesYes: Number(body.votesYes) || 0,
          votesNo: Number(body.votesNo) || 0,
          active: true
        });
      }

      writeDuels(current);
      return NextResponse.json({ success: true, duels: current });
    }

    // 2. Criação de nova pauta com votos configurados
    if (body.action === "create") {
      const newEntry = {
        id: "duel-" + Date.now(),
        category: body.category || "GERAL",
        title: body.title,
        votesYes: Number(body.votesYes) || 0,
        votesNo: Number(body.votesNo) || 0,
        active: true
      };
      current = [newEntry, ...current];
      writeDuels(current);
      return NextResponse.json({ success: true, duel: newEntry, duels: current });
    }

    // 3. Exclusão de duelo
    if (body.action === "delete") {
      current = current.filter((d: any) => d.id !== body.duelId);
      writeDuels(current);
      return NextResponse.json({ success: true, duels: current });
    }

    return NextResponse.json({ success: false });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
