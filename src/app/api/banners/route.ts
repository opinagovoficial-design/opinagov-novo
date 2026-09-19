import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "src", "lib", "banners-data.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

function readBanners() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Erro ao ler banners:", err);
  }
  return [];
}

function writeBanners(items: any[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Erro ao escrever banners:", err);
  }
}

export async function GET() {
  try {
    const banners = readBanners();
    const now = Date.now();
    // Mantém ativos os que não venceram (40 dias)
    const valid = banners.filter((b: any) => !b.expiresAt || Number(b.expiresAt) > now);
    return NextResponse.json(valid);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let current = readBanners();

    if (body.action === "delete") {
      current = current.filter((b: any) => b.id !== body.id);
      writeBanners(current);
      return NextResponse.json({ success: true, banners: current });
    }

    let finalImageUrl = body.imageUrl;

    // Se veio imagem em Base64 pesado, salva no disco local em /public/uploads
    if (body.imageUrl && body.imageUrl.startsWith("data:image")) {
      const matches = body.imageUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].includes("png") ? "png" : matches[1].includes("webp") ? "webp" : "jpg";
        const buffer = Buffer.from(matches[2], "base64");
        const filename = "banner-" + Date.now() + "." + ext;
        
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, buffer);
        finalImageUrl = "/uploads/" + filename;
      }
    }

    const now = Date.now();
    const newBanner = {
      id: "ban-" + now,
      title: body.title || "Anúncio Patrocinado",
      imageUrl: finalImageUrl,
      targetUrl: body.targetUrl || "https://opinagov.com.br",
      phone: body.phone || "",
      createdAt: now,
      expiresAt: now + 40 * 24 * 60 * 60 * 1000,
    };

    const updated = [newBanner, ...current];
    writeBanners(updated);

    return NextResponse.json({ success: true, banner: newBanner, banners: updated });
  } catch (error) {
    console.error("Erro no upload de banner:", error);
    return NextResponse.json({ error: "Erro ao processar anúncio" }, { status: 500 });
  }
}
