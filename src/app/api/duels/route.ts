import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
const filePath = path.join(process.cwd(), "src", "lib", "duels-data.json");

function getDuels() {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch {}
  return [];
}

function saveDuels(data: any[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  return NextResponse.json(getDuels());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let list = getDuels();

    if (body.action === "update_votes") {
      list = list.map((d: any) => {
        if (d.id === body.duelId || String(d.title).toLowerCase().includes(String(body.duelId).toLowerCase())) {
          return {
            ...d,
            votesYes: Number(body.votesYes) || 0,
            votesNo: Number(body.votesNo) || 0
          };
        }
        return d;
      });
      saveDuels(list);
      return NextResponse.json({ success: true, duels: list });
    }

    if (body.action === "create" || (!body.action && body.title)) {
      const newEntry = {
        id: "duel-" + Date.now(),
        category: body.category || "GERAL",
        title: body.title,
        votesYes: Number(body.votesYes) || 0,
        votesNo: Number(body.votesNo) || 0,
        active: true
      };
      list = [newEntry, ...list];
      saveDuels(list);
      return NextResponse.json({ success: true, duel: newEntry, duels: list });
    }

    if (body.action === "delete") {
      list = list.filter((d: any) => d.id !== body.duelId);
      saveDuels(list);
      return NextResponse.json({ success: true, duels: list });
    }

    return NextResponse.json({ success: true, duels: list });
  } catch {
    return NextResponse.json({ error: "Erro na API" }, { status: 500 });
  }
}
