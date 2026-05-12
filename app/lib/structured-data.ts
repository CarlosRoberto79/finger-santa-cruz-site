import {
  absoluteUrl,
  FINGER_SANTA_CRUZ_ADDRESS,
  FINGER_SANTA_CRUZ_COMMERCIAL_EMAIL,
  FINGER_SANTA_CRUZ_SOCIALS,
  FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY,
  SHARING_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_IMAGES,
  SITE_KEYWORDS,
  SITE_NAME,
} from "./site-config";

const pageUrl = absoluteUrl("/");
const logoUrl = absoluteUrl("/finger-logo.svg");
const localBusinessId = `${pageUrl}#local-business`;
const organizationId = `${pageUrl}#organization`;
const websiteId = `${pageUrl}#website`;
const webpageId = `${pageUrl}#webpage`;
const breadcrumbId = `${pageUrl}#breadcrumb`;
const sameAs = Object.values(FINGER_SANTA_CRUZ_SOCIALS);

const serviceNames = [
  "Móveis planejados",
  "Ambientes planejados",
  "Móveis sob medida",
  "Cozinhas planejadas",
  "Dormitórios planejados",
  "Closets planejados",
  "Salas planejadas",
  "Banheiros planejados",
  "Lavanderias planejadas",
  "Home offices planejados",
  "Ambientes corporativos planejados",
  "Projetos de interiores",
];

const weekdayOpeningHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "12:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "13:30",
    closes: "18:00",
  },
];

const specialists = [
  {
    id: "geisa-raupp",
    name: "Geísa Raupp",
    jobTitle: "Gerente Comercial",
    image: "/specialists/geisa.jpg",
    description:
      "Gerente Comercial da Finger Santa Cruz do Sul, com experiência em ambientes planejados e atendimento consultivo personalizado.",
  },
  {
    id: "alice-antunes",
    name: "Alice Antunes",
    jobTitle: "Especialista em ambientes planejados",
    image: "/specialists/alice.jpg",
    description:
      "Especialista da Finger Santa Cruz do Sul com atuação em interiores, funcionalidade e ambientes personalizados.",
  },
  {
    id: "ana-nicolay",
    name: "Ana Nicolay",
    jobTitle: "Arquiteta e Urbanista",
    image: "/specialists/ana.jpg",
    description:
      "Arquiteta e Urbanista da Finger Santa Cruz do Sul, especializada em projetos de interiores e detalhamento de ambientes personalizados.",
  },
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: pageUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 124,
        height: 55,
      },
      image: SITE_IMAGES.sharing,
      sameAs,
    },
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Store"],
      "@id": localBusinessId,
      name: SITE_NAME,
      url: pageUrl,
      description: SITE_DESCRIPTION,
      telephone: FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY,
      email: FINGER_SANTA_CRUZ_COMMERCIAL_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Tenente Coronel Brito, 141 loja 5",
        addressLocality: "Santa Cruz do Sul",
        addressRegion: "RS",
        postalCode: "96810-202",
        addressCountry: "BR",
      },
      areaServed: [
        {
          "@type": "City",
          name: "Santa Cruz do Sul",
          containedInPlace: {
            "@type": "State",
            name: "Rio Grande do Sul",
          },
        },
        "Santa Cruz do Sul e região",
      ],
      priceRange: "$$$",
      image: [SITE_IMAGES.sharing, SITE_IMAGES.institutional],
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 124,
        height: 55,
      },
      openingHours: "Mo-Fr 08:30-12:00,13:30-18:00",
      openingHoursSpecification: weekdayOpeningHoursSpecification,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY,
          email: FINGER_SANTA_CRUZ_COMMERCIAL_EMAIL,
          areaServed: "BR",
          availableLanguage: ["pt-BR", "pt"],
        },
      ],
      sameAs,
      brand: {
        "@type": "Brand",
        name: "Finger Móveis Planejados",
      },
      knowsAbout: SITE_KEYWORDS,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Ambientes planejados Finger Santa Cruz do Sul",
        itemListElement: serviceNames.map((serviceName) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
            serviceType: serviceName,
            areaServed: "Santa Cruz do Sul, RS",
            provider: {
              "@id": localBusinessId,
            },
          },
        })),
      },
      mainEntityOfPage: {
        "@id": webpageId,
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url: pageUrl,
      inLanguage: "pt-BR",
      publisher: {
        "@id": organizationId,
      },
      about: {
        "@id": localBusinessId,
      },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: SITE_NAME,
      headline:
        "Móveis planejados e ambientes personalizados em Santa Cruz do Sul",
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": localBusinessId,
      },
      breadcrumb: {
        "@id": breadcrumbId,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: SITE_IMAGES.sharing,
        caption: SHARING_IMAGE_ALT,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: pageUrl,
        },
      ],
    },
    ...specialists.map((person) => ({
      "@type": "Person",
      "@id": `${pageUrl}#${person.id}`,
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      image: absoluteUrl(person.image),
      worksFor: {
        "@id": localBusinessId,
      },
      address: FINGER_SANTA_CRUZ_ADDRESS,
      knowsAbout: [
        "móveis planejados",
        "ambientes personalizados",
        "projetos de interiores",
        "atendimento consultivo",
      ],
    })),
    {
      "@type": "ContactPoint",
      "@id": `${pageUrl}#contact-point`,
      contactType: "customer support",
      telephone: FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY,
      email: FINGER_SANTA_CRUZ_COMMERCIAL_EMAIL,
      hoursAvailable: weekdayOpeningHoursSpecification,
      areaServed: "Santa Cruz do Sul, RS",
      availableLanguage: ["pt-BR", "pt"],
    },
  ],
};

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
