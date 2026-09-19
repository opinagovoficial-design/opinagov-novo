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
    let duels = getDuels();

    if (body.action === "update_votes") {
      duels = duels.map((d: any) => {
        if (d.id === body.duelId || d.title.toLowerCase().includes(String(body.duelId).toLowerCase())) {
          return {
            ...d,
            votesYes: Number(body.votesYes),
            votesNo: Number(body.votesNo)
          };
        }
        return d;
      });
      saveDuels(duels);
      return NextResponse.json({ success: true, duels });
    }

    if (body.action === "create") {
      const newD = {
        id: "duel-" + Date.now(),
        category: body.category || "GERAL",
        title: body.title,
        votesYes: Number(body.votesYes) || 0,
        votesNo: Number(body.votesNo) || 0,
        active: true
      };
      duels = [newD, ...duels];
      saveDuels(duels);
      return NextResponse.json({ success: true, duel: newD, duels });
    }

    if (body.action === "delete") {
      duels = duels.filter((d: any) => d.id !== body.duelId);
      saveDuels(duels);
      return NextResponse.json({ success: true, duels });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
