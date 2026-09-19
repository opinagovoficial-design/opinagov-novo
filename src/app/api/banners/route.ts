import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { defaultBanners, BannerItem } from "@/lib/banners-storage-seed";

const dataFilePath = path.join(process.cwd(), "src/lib/banners-data.json");

function readBanners(): BannerItem[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  // Se estiver vazio ou der erro de leitura, recupera o seed fixo
  return defaultBanners;
}

function writeBanners(items: BannerItem[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  const now = Date.now();
  const all = readBanners();
  // Filtra anúncios que já venceram os 40 dias
  const active = all.filter((b) => Number(b.expiresAt) > now);

  if (active.length !== all.length) {
    writeBanners(active);
  }

  return NextResponse.json(active);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let current = readBanners();

    if (body.action === "delete") {
      current = current.filter((b) => b.id !== body.id);
      writeBanners(current);
      return NextResponse.json({ success: true, banners: current });
    }

    const now = Date.now();
    const newBanner: BannerItem = {
      id: "ban-" + now,
      title: body.title || "Anúncio Patrocinado",
      imageUrl: body.imageUrl,
      targetUrl: body.targetUrl || "https://opinagov.com.br",
      phone: body.phone || "",
      createdAt: now,
      expiresAt: now + 40 * 24 * 60 * 60 * 1000,
    };

    const updated = [newBanner, ...current];
    writeBanners(updated);

    return NextResponse.json({ success: true, banner: newBanner, banners: updated });
  } catch {
    return NextResponse.json({ error: "Falha ao processar anúncio" }, { status: 500 });
  }
}
