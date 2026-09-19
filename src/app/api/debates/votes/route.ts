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
  } catch {}
  return {};
}

function saveVotes(data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  return NextResponse.json(getVotes());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.duelId || body.debateId;
    if (!id) return NextResponse.json({ error: "ID ausente" }, { status: 400 });

    const current = getVotes();
    current[id] = {
      yes: Number(body.yesVotes) || 0,
      no: Number(body.noVotes) || 0
    };
    saveVotes(current);
    return NextResponse.json({ success: true, votes: current });
  } catch {
    return NextResponse.json({ error: "Falha ao gravar" }, { status: 500 });
  }
}
