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
    let current = readDuels();

    // Atualizar votos de um duelo específico
    if (body.action === "update_votes") {
      current = current.map((d: any) => {
        if (d.id === body.duelId || d.title.toLowerCase().includes(String(body.duelId).toLowerCase())) {
          return {
            ...d,
            votesYes: Number(body.votesYes) || 0,
            votesNo: Number(body.votesNo) || 0
          };
        }
        return d;
      });
      writeDuels(current);
      return NextResponse.json({ success: true, duels: current });
    }

    // Criar novo duelo
    if (body.action === "create") {
      const newDuel = {
        id: "duel-" + Date.now(),
        category: body.category || "GERAL",
        title: body.title,
        votesYes: Number(body.votesYes) || 0,
        votesNo: Number(body.votesNo) || 0,
        active: true
      };
      current = [newDuel, ...current];
      writeDuels(current);
      return NextResponse.json({ success: true, duel: newDuel, duels: current });
    }

    // Deletar duelo
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
