import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "src", "lib", "banners-data.json");

function readBanners() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) return list;
    }
  } catch (err) {
    console.error("Erro na leitura:", err);
  }
  return [];
}

function writeBanners(items: any[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Erro na escrita:", err);
  }
}

export async function GET() {
  const all = readBanners();
  const now = Date.now();
  // Apenas remove se a data tiver expirado (40 dias)
  const valid = all.filter((b: any) => !b.expiresAt || Number(b.expiresAt) > now);
  
  if (valid.length !== all.length) {
    writeBanners(valid);
  }
  return NextResponse.json(valid);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let current = readBanners();

    // Sincronização automática vinda do LocalStorage caso o servidor reinicie
    if (body.action === "sync_all" && Array.isArray(body.banners)) {
      const now = Date.now();
      const mergedMap = new Map();
      
      // Junta os anúncios existentes com os do navegador
      [...current, ...body.banners].forEach((b) => {
        if (b && b.id && (!b.expiresAt || Number(b.expiresAt) > now)) {
          mergedMap.set(b.id, b);
        }
      });
      
      const merged = Array.from(mergedMap.values());
      writeBanners(merged);
      return NextResponse.json({ success: true, banners: merged });
    }

    // Remoção manual pelo utilizador
    if (body.action === "delete") {
      current = current.filter((b: any) => b.id !== body.id);
      writeBanners(current);
      return NextResponse.json({ success: true, banners: current });
    }

    // Criação de novo banner
    const now = Date.now();
    const newBanner = {
      id: "ban-" + now,
      title: body.title || "Patrocinador Oficial",
      imageUrl: body.imageUrl,
      targetUrl: body.targetUrl || "https://opinagov.com.br",
      phone: body.phone || "",
      createdAt: now,
      expiresAt: now + 40 * 24 * 60 * 60 * 1000,
    };

    const updated = [newBanner, ...current];
    writeBanners(updated);

    return NextResponse.json({ success: true, banner: newBanner, banners: updated });
  } catch (e) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
