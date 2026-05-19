import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  SHARING_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_IMAGES,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "./lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: SITE_IMAGES.sharing,
        width: 1920,
        height: 1080,
        alt: SHARING_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGES.sharing,
        alt: SHARING_IMAGE_ALT,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "home improvement",
  other: {
    "geo.region": "BR-RS",
    "geo.placename": "Santa Cruz do Sul",
    "business:contact_data:locality": "Santa Cruz do Sul",
    "business:contact_data:region": "Rio Grande do Sul",
    "business:contact_data:country_name": "Brasil",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <GoogleTagManager gtmId="GTM-P8FMLBK9" />
        {children}
      </body>
    </html>
  );
}
