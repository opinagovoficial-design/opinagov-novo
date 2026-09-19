export interface BannerItem {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  phone?: string;
  createdAt: number;
  expiresAt: number;
}

export const defaultBanners: BannerItem[] = [
  {
    id: "seed-banner-1",
    title: "Espaço Institucional e Patrocínio",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    targetUrl: "https://wa.me/5511999999999?text=Quero%20anunciar%20no%20OpinaGov",
    phone: "",
    createdAt: 1789790777414,
    expiresAt: 1793246777414,
  }
];
