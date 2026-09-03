const FALLBACK_SITE_URL = "https://www.fingersantacruz.com.br";

function withoutTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = withoutTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
);

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

export const SITE_NAME = "Finger Santa Cruz do Sul";
export const SITE_TITLE =
  "Finger Santa Cruz do Sul | Móveis Planejados e Ambientes Personalizados";
export const SITE_DESCRIPTION =
  "Projetos de móveis planejados e ambientes personalizados em Santa Cruz do Sul. Conheça a Finger Santa Cruz do Sul e transforme sua casa com design, funcionalidade e sofisticação.";

export const SITE_KEYWORDS = [
  "móveis planejados em Santa Cruz do Sul",
  "ambientes planejados em Santa Cruz do Sul",
  "móveis sob medida Santa Cruz do Sul",
  "loja de móveis planejados Santa Cruz do Sul",
  "Finger Santa Cruz do Sul",
  "cozinhas planejadas Santa Cruz do Sul",
  "dormitórios planejados Santa Cruz do Sul",
  "interiores personalizados Santa Cruz do Sul",
  "projetos de interiores Santa Cruz do Sul",
  "móveis planejados premium",
  "closets planejados Santa Cruz do Sul",
  "home office planejado Santa Cruz do Sul",
  "showroom Finger Santa Cruz do Sul",
];

export const FINGER_SANTA_CRUZ_WHATSAPP = "5551999718164";
export const FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY = "+55 51 99971-8164";
export const FINGER_SANTA_CRUZ_ADDRESS =
  "Rua Tenente Coronel Brito, 141 loja 5, Santa Cruz do Sul - RS, CEP 96810-202";
export const FINGER_SANTA_CRUZ_HOURS =
  "Seg - Sex: 08:30-12:00 | 13:30-18:00";
export const FINGER_SANTA_CRUZ_COMMERCIAL_EMAIL =
  "fingersantacruzdosul@gmail.com";
export const CONTACT_FORM_RECIPIENTS = ["procarlosroberto@gmail.com"];

export const FINGER_SANTA_CRUZ_SOCIALS = {
  instagram: "https://www.instagram.com/fingersantacruzdosul",
  facebook: "https://www.facebook.com/fingersantacruzdosul",
  pinterest: "https://www.pinterest.com/fingersantacruzdosul",
} as const;

export const SITE_IMAGES = {
  heroPoster: "https://finger.ind.br/wp-content/uploads/2026/03/bloco-nova-colecao.jpg",
  heroVideo:
    "https://finger.ind.br/wp-content/uploads/2026/03/bloco-nova-colecao-1.mp4",
  institutional:
    "https://finger.ind.br/wp-content/uploads/2025/08/img-1.jpg",
  sharing:
    "https://finger.ind.br/wp-content/uploads/2026/03/bloco-nova-colecao.jpg",
} as const;

export const SHARING_IMAGE_ALT =
  "Ambiente planejado Finger com cozinha em madeira, ilha central e atmosfera sofisticada.";
