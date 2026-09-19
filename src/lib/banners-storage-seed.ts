export interface BannerItem {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  phone?: string;
  createdAt: number;
  expiresAt: number;
}

// Banners fixados diretamente na base do código (imunes a deploys da Vercel)
export const defaultBanners: BannerItem[] = [
  {
    id: "banner-hapvida",
    title: "Hapvida NotreDame Intermédica",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    targetUrl: "https://www.hapvidandi.com.br",
    phone: "",
    createdAt: Date.now(),
    expiresAt: Date.now() + 40 * 24 * 60 * 60 * 1000,
  }
];
