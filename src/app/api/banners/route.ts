import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { defaultBanners, BannerItem } from "@/lib/banners-storage-seed";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "src", "lib", "banners-data.json");

function getBanners(): BannerItem[] {
  let list: BannerItem[] = [];
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed;
      }
    }
  } catch {}

  // Se o deploy da Vercel limpou o arquivo temporário, usa o seed estável
  if (list.length === 0) {
    list = [...defaultBanners];
  }

  const now = Date.now();
  return list.filter((b) => !b.expiresAt || Number(b.expiresAt) > now);
}

function saveBanners(items: BannerItem[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2), "utf8");
  } catch {}
}

export async function GET() {
  return NextResponse.json(getBanners());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let current = getBanners();

    if (body.action === "delete") {
      current = current.filter((b) => b.id !== body.id);
      saveBanners(current);
      return NextResponse.json({ success: true, banners: current });
    }

    if (body.action === "sync_all" && Array.isArray(body.banners)) {
      saveBanners(body.banners);
      return NextResponse.json({ success: true, banners: body.banners });
    }

    const now = Date.now();
    const newBanner: BannerItem = {
      id: "ban-" + now,
      title: body.title || "Patrocinador Oficial",
      imageUrl: body.imageUrl,
      targetUrl: body.targetUrl || "https://opinagov.com.br",
      phone: body.phone || "",
      createdAt: now,
      expiresAt: now + 40 * 24 * 60 * 60 * 1000,
    };

    const updated = [newBanner, ...current];
    saveBanners(updated);

    return NextResponse.json({ success: true, banner: newBanner, banners: updated });
  } catch {
    return NextResponse.json({ error: "Erro ao processar banner" }, { status: 500 });
  }
}
