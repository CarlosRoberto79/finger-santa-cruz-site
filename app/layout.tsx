import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finger Santa Cruz do Sul | Móveis Planejados de Alto Padrão",
  description:
    "Ambientes personalizados Finger em Santa Cruz do Sul: móveis planejados de alto padrão, design europeu, bem-estar e interiores sofisticados.",
  applicationName: "Finger Santa Cruz do Sul",
  keywords: [
    "Finger Santa Cruz do Sul",
    "móveis planejados Santa Cruz do Sul",
    "móveis planejados alto padrão",
    "cozinha planejada premium",
    "closet planejado",
    "interiores sofisticados",
  ],
  openGraph: {
    title: "Finger Santa Cruz do Sul | Móveis Planejados de Alto Padrão",
    description:
      "Projetos exclusivos para cozinhas, livings, dormitórios, closets e ambientes completos.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://finger.ind.br/wp-content/uploads/2026/03/bloco-nova-colecao.jpg",
        width: 1920,
        height: 1080,
        alt: "Ambiente planejado Finger com cozinha em madeira e ilha central.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
