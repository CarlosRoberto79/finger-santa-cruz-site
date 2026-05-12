import Image from "next/image";
import type { ReactNode } from "react";
import { EnvironmentCarousel } from "./components/environment-carousel";
import { LeadForm } from "./components/lead-form";
import { SectionHeading } from "./components/section-heading";
import {
  FINGER_SANTA_CRUZ_HOURS,
  FINGER_SANTA_CRUZ_SOCIALS,
  FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY,
  WhatsAppLink,
} from "./components/whatsapp-link";
import { SITE_IMAGES } from "./lib/site-config";
import { serializeJsonLd, structuredData } from "./lib/structured-data";

const heroVideo = SITE_IMAGES.heroVideo;
const heroPoster = SITE_IMAGES.heroPoster;
const institutionalImage = SITE_IMAGES.institutional;

const gallery = [
  {
    title: "A cozinha como lugar de encontro",
    label: "Cozinha",
    image: "https://finger.ind.br/wp-content/uploads/2026/03/home.png",
    alt: "Cozinha planejada Finger em Santa Cruz do Sul com ilha, madeira escura e iluminação natural.",
  },
  {
    title: "O living onde a vida ganha forma",
    label: "Sala",
    image: "https://finger.ind.br/wp-content/uploads/2026/03/home-2.png",
    alt: "Living planejado Finger com painel em madeira, lareira e composição clara.",
  },
  {
    title: "O dormitório como refúgio",
    label: "Dormitório",
    image: "https://finger.ind.br/wp-content/uploads/2026/03/home-5.png",
    alt: "Dormitório planejado Finger em Santa Cruz do Sul com madeira, luz natural e atmosfera acolhedora.",
  },
  {
    title: "Banheiro com atmosfera de pausa",
    label: "Banheiro",
    image: "https://finger.ind.br/wp-content/uploads/2026/03/home-10.png",
    alt: "Banheiro planejado Finger com bancada clara, marcenaria elegante e atmosfera de spa.",
  },
  {
    title: "Lavanderia integrada ao ritmo da casa",
    label: "Lavanderia",
    image: "https://finger.ind.br/wp-content/uploads/2026/03/home-11.png",
    alt: "Lavanderia planejada Finger com armários sob medida e composição funcional.",
  },
  {
    title: "Corporativo com presença e silêncio visual",
    label: "Corporativo",
    image: "https://finger.ind.br/wp-content/uploads/2026/03/home-17.png",
    alt: "Ambiente corporativo Finger com mesa de trabalho, marcenaria planejada e luz natural.",
  },
];

const differentials = [
  {
    title: "Essência em cada ambiente",
    text: "Projetos que partem da rotina, das preferências e da identidade de quem vive a casa.",
  },
  {
    title: "Design europeu",
    text: "Linhas limpas, superfícies precisas e proporções pensadas para permanecer elegantes.",
  },
  {
    title: "Precisão alemã",
    text: "Atenção aos encaixes, ferragens, texturas e acabamentos desde o primeiro desenho.",
  },
  {
    title: "Bem-estar como propósito",
    text: "Ambientes personalizados para acolher, facilitar o cotidiano e criar experiências sensoriais.",
  },
];

const authorityNumbers = [
  ["1978", "origem industrial e vocação para precisão"],
  ["+5 mil", "ambientes produzidos mensalmente"],
  ["+150", "showrooms conectados ao universo Finger"],
];

const footerEnvironments = [
  "Cozinha",
  "Sala",
  "Dormitório",
  "Banheiro",
  "Lavanderia",
  "Corporativo",
];

const localSocialLinks = [
  ["Instagram", FINGER_SANTA_CRUZ_SOCIALS.instagram, "instagram"],
  ["Facebook", FINGER_SANTA_CRUZ_SOCIALS.facebook, "facebook"],
  ["Pinterest", FINGER_SANTA_CRUZ_SOCIALS.pinterest, "pinterest"],
] as const;

const showroomAddressLines = [
  "Rua Tenente Coronel Brito, 141 loja 5",
  "Santa Cruz do Sul - RS",
  "CEP 96810-202",
];

const specialists = [
  {
    name: "GEÍSA RAUPP",
    role: "Gerente Comercial • Finger Santa Cruz do Sul",
    image: "/specialists/geisa.webp",
    alt: "Geísa Raupp, especialista Finger Santa Cruz do Sul.",
    bio: [
      "Gerente Comercial da Finger Santa Cruz do Sul, Geísa Raupp possui mais de 15 anos de experiência no universo dos ambientes planejados.",
      "Sua trajetória construída ao lado de clientes e projetos personalizados garante um atendimento próximo, estratégico e orientado aos detalhes que tornam cada ambiente único.",
    ],
    cta: "Inicie seu atendimento comigo",
  },
  {
    name: "ALICE ANTUNES",
    role: "Especialista • Finger Santa Cruz do Sul",
    image: "/specialists/alice.webp",
    alt: "Alice Antunes, especialista Finger Santa Cruz do Sul.",
    bio: [
      "Com olhar contemporâneo e sensibilidade para interiores, Alice Antunes atua no desenvolvimento de ambientes que unem estética, funcionalidade e personalidade.",
      "Sua vivência em projetos de interiores, aliada à paixão por arquitetura e design, contribui para criar espaços acolhedores, elegantes e alinhados à rotina de cada cliente.",
    ],
  },
  {
    name: "ANA NICOLAY",
    role: "Especialista • Finger Santa Cruz do Sul",
    image: "/specialists/ana.webp",
    alt: "Ana Nicolay, especialista Finger Santa Cruz do Sul.",
    bio: [
      "Arquiteta e Urbanista, Ana Nicolay transforma técnica e sensibilidade em ambientes que equilibram funcionalidade, conforto e estética contemporânea.",
      "Com experiência em projetos de interiores e detalhamento executivo, desenvolve espaços personalizados com atenção minuciosa aos detalhes, sempre respeitando o estilo de vida e a essência de cada cliente.",
    ],
  },
];

const whatsappMessage =
  "Olá, Finger Santa Cruz do Sul. Gostaria de conversar sobre um ambiente personalizado com a Finger.";

export default function Home() {
  return (
    <main id="top" className="overflow-hidden bg-[#FFFCF2] text-[#403D39]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <Hero />
      <Institutional />
      <Differentials />
      <Gallery />
      <Authority />
      <Specialists />
      <Contact />
      <PremiumFooter />
      <MobileWhatsApp />
    </main>
  );
}

function Hero() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative min-h-[82svh] overflow-hidden bg-[#252422] text-[#FFFCF2] sm:min-h-[86svh]"
      >
        <div className="absolute inset-0">
          <Image
            src={heroPoster}
            alt="Cozinha planejada Finger em Santa Cruz do Sul com madeira natural, ilha central e vista para a natureza."
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <video
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full scale-[1.02] object-cover opacity-90 motion-safe:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,36,34,0.68)_0%,rgba(37,36,34,0.36)_48%,rgba(37,36,34,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,36,34,0.32)_0%,rgba(37,36,34,0.03)_45%,rgba(37,36,34,0.26)_100%)]" />
        </div>

        <header
          aria-label="Cabeçalho principal"
          className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-10"
        >
          <a
            className="group flex items-center gap-4"
            href="#top"
            aria-label="Finger Santa Cruz do Sul"
          >
            <Image
              src="/finger-logo.svg"
              alt="Finger Móveis Planejados"
              width={124}
              height={55}
              className="h-[44px] w-auto sm:h-[62px]"
            />
            <span className="block border-l border-white/18 pl-[0.85rem] text-[0.6rem] font-bold uppercase leading-[0.84rem] tracking-normal text-[#FFFCF2]/68 sm:border-white/22 sm:pl-[1.1rem] sm:text-[0.69rem] sm:leading-[1.1rem]">
              Santa Cruz
              <br />
              do Sul
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 text-[0.58rem] font-bold uppercase tracking-normal text-[#FFFCF2]/64 md:flex"
          >
            <a className="transition hover:text-[#FFFCF2]" href="#diferenciais">
              Diferenciais
            </a>
            <a className="transition hover:text-[#FFFCF2]" href="#ambientes">
              Ambientes
            </a>
            <a className="transition hover:text-[#FFFCF2]" href="#contato">
              Contato
            </a>
          </nav>

          <WhatsAppLink
            id="cta-whatsapp-header"
            aria-label="Conversar com a Finger Santa Cruz do Sul pelo WhatsApp"
            className="hidden h-12 items-center rounded-full border border-[#FFFCF2]/28 px-6 text-xs font-bold text-[#FFFCF2] transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] sm:inline-flex"
            message={whatsappMessage}
          >
            WhatsApp
          </WhatsAppLink>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(82svh-86px)] max-w-7xl flex-col justify-end px-5 pb-12 pt-16 sm:min-h-[calc(86svh-110px)] sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-5 w-fit rounded-full border border-[#FFFCF2]/26 px-4 py-2 text-[0.58rem] font-bold uppercase tracking-normal text-[#FFFCF2]/82 sm:mb-6 sm:text-[0.62rem]">
              Design europeu com precisão alemã
            </p>
            <h1
              id="hero-title"
              className="font-display max-w-4xl text-5xl font-[500] leading-[0.94] text-[#FFFCF2] sm:text-7xl sm:leading-[0.9] lg:text-8xl xl:text-9xl"
            >
              Ambientes personalizados para viver com alma.
            </h1>
            <p className="mt-6 max-w-2xl font-display text-lg font-light leading-7 text-[#FFFCF2]/82 sm:mt-8 sm:text-2xl sm:leading-10">
              Móveis planejados que acolhem sua rotina, revelam sua essência e
              transformam o morar em uma experiência de bem-estar.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <WhatsAppLink
                id="cta-whatsapp-hero"
                aria-label="Iniciar atendimento pelo WhatsApp com a Finger Santa Cruz do Sul"
                className="flex min-h-14 items-center justify-center rounded-full bg-[#C44E2A] px-6 text-center text-sm font-bold text-white transition duration-300 hover:bg-[#FFFCF2] hover:text-[#403D39] sm:px-7"
                message={whatsappMessage}
              >
                Quero meu espaço Finger
              </WhatsAppLink>
              <a
                className="flex min-h-14 items-center justify-center rounded-full border border-[#FFFCF2]/32 px-6 text-center text-sm font-bold text-[#FFFCF2] transition duration-300 hover:border-[#FFFCF2] hover:bg-[#FFFCF2]/10 sm:px-7"
                href="#contato"
              >
                Enviar briefing
              </a>
            </div>
          </div>
        </div>
      </section>
      <HeroMetricsBand />
    </>
  );
}

function HeroMetricsBand() {
  return (
    <section
      aria-label="Jornada Finger"
      className="border-y border-[#403D39]/10 bg-[#FFFCF2] px-5 py-7 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
        <HeroMetric value="01" label="Escuta e acolhimento" />
        <HeroMetric value="02" label="Ambiente personalizado" />
        <HeroMetric value="03" label="Precisão em cada detalhe" />
      </div>
    </section>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="group flex items-center gap-5 border border-[#403D39]/10 bg-[#FFFDF3]/78 px-5 py-5 transition duration-300 hover:border-[#C44E2A]/34 hover:bg-white sm:px-6">
      <span className="font-display text-4xl font-light leading-none text-[#C44E2A]">
        {value}
      </span>
      <span className="max-w-36 text-[0.62rem] font-bold uppercase leading-5 tracking-normal text-[#403D39]/68 transition group-hover:text-[#252422]">
        {label}
      </span>
    </div>
  );
}

function Institutional() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="px-5 py-20 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
        <SectionHeading
          eyebrow="Bem-estar"
          titleId="sobre-title"
          title="Um bom ambiente não é apenas onde você vive. É onde você se encontra."
        >
          <p>
            A Finger Santa Cruz do Sul cria espaços sob medida para traduzir
            histórias, hábitos e sensações em ambientes funcionais, silenciosos
            e profundamente pessoais.
          </p>
          <p className="mt-5">
            A jornada começa na escuta: entender o que acolhe, o que simplifica
            a rotina e o que torna cada detalhe parte natural da arquitetura.
          </p>
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-[0.72fr_1fr]">
          <div className="border border-[#403D39]/12 bg-[#FFFDF3]/70 p-7 sm:p-9">
            <p className="text-[0.62rem] font-bold uppercase tracking-normal text-[#C44E2A]">
              Ambientes Personalizados
            </p>
            <p className="mt-8 font-display text-3xl font-light leading-tight text-[#252422]">
              Design que respeita sua essência e valoriza o tempo vivido dentro
              de casa.
            </p>
          </div>
          <div className="relative min-h-[440px] overflow-hidden bg-[#D8D1C6]">
            <Image
              src={institutionalImage}
              alt="Ambiente Finger com mobiliário planejado e atmosfera acolhedora."
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover transition duration-700 hover:scale-[1.025]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-title"
      className="bg-[#252422] px-5 py-20 text-[#FFFCF2] sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-normal text-[#C44E2A]">
              Diferenciais Finger
            </p>
            <h2
              id="diferenciais-title"
              className="font-display text-4xl font-[500] leading-[0.98] sm:text-6xl"
            >
              Luxo silencioso é precisão, acolhimento e permanência.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden bg-[#FFFCF2]/12 sm:grid-cols-2">
            {differentials.map((item, index) => (
              <article
                className="animate-fade-up bg-[#252422] p-7 transition duration-300 hover:bg-[#403D39] sm:p-9"
                key={item.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="font-display text-5xl font-light text-[#C44E2A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-9 text-xl font-bold text-[#FFFCF2]">
                  {item.title}
                </h3>
                <p className="mt-4 font-display text-lg font-light leading-8 text-[#FFFCF2]/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section
      id="ambientes"
      aria-labelledby="ambientes-title"
      className="bg-[#FFFDF3] px-5 py-20 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Galeria de ambientes"
          titleId="ambientes-title"
          title="Texturas, luz e proporções para transformar o morar em experiência."
          className="max-w-4xl"
        >
          <p>
            Ambientes Finger são pensados para unir beleza, funcionalidade e
            aconchego. Cada superfície, abertura e composição participa da
            sensação de viver bem.
          </p>
        </SectionHeading>

        <EnvironmentCarousel items={gallery} />
      </div>
    </section>
  );
}

function Authority() {
  return (
    <section
      aria-labelledby="autoridade-title"
      className="px-5 py-20 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="border-y border-[#403D39]/14 py-8">
          {authorityNumbers.map(([value, label]) => (
            <div
              className="grid grid-cols-[0.72fr_1fr] gap-6 border-b border-[#403D39]/12 py-8 last:border-b-0"
              key={label}
            >
              <span className="font-display text-5xl font-light leading-none text-[#C44E2A] sm:text-6xl">
                {value}
              </span>
              <p className="self-center text-[0.68rem] font-bold uppercase leading-6 tracking-normal text-[#403D39]/68">
                {label}
              </p>
            </div>
          ))}
        </div>

        <SectionHeading
          eyebrow="Autoridade"
          titleId="autoridade-title"
          title="Uma marca nascida da precisão e movida pelo bem-estar."
        >
          <p>
            Desde 1978, a Finger une origem industrial, vocação germânica e
            busca por inovação para transformar espaços em ambientes
            verdadeiramente personalizados.
          </p>
          <p className="mt-5">
            A sofisticação aparece no que permanece: proporção, textura,
            conforto, funcionalidade e cuidado com cada detalhe.
          </p>
        </SectionHeading>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section
      id="especialistas"
      aria-labelledby="especialistas-title"
      className="bg-[#252422] px-5 py-20 text-[#FFFCF2] sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <SectionHeading
            eyebrow="Especialistas"
            titleId="especialistas-title"
            title="Atendimento consultivo para transformar intenção em ambiente."
            className="[&_h2]:text-[#FFFCF2] [&_div]:text-[#FFFCF2]/66"
          >
            <p className="text-[#FFFCF2]/66">
              Na Finger Santa Cruz do Sul, a primeira conversa abre espaço para
              entender medidas, rotina, desejos e a atmosfera que deve orientar
              cada escolha do projeto.
            </p>
          </SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((person, index) => (
              <article
                className="group flex h-full animate-fade-up flex-col border border-[#FFFCF2]/12 bg-[#403D39]/42 p-3 transition duration-300 hover:border-[#C44E2A]/48 hover:bg-[#403D39]/70"
                key={person.name}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#D8D1C6]">
                  <Image
                    src={person.image}
                    alt={person.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-4 pt-6">
                  <h3 className="font-display text-2xl font-[500] leading-tight text-[#FFFCF2]">
                    {person.name}
                  </h3>
                  <p className="mt-3 text-[0.58rem] font-bold uppercase leading-4 tracking-normal text-[#C44E2A]/78">
                    {person.role}
                  </p>
                  <div className="mt-5 space-y-4 font-display text-base font-light leading-7 text-[#FFFCF2]/68">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {"cta" in person ? (
                    <WhatsAppLink
                      id="cta-whatsapp-geisa"
                      aria-label="Iniciar atendimento pelo WhatsApp com Geísa Raupp"
                      className="mt-7 flex min-h-12 items-center justify-center rounded-full border border-[#FFFCF2]/18 px-5 text-center text-xs font-bold text-[#FFFCF2]/86 transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] hover:text-white"
                      message={`${whatsappMessage}\n\nGostaria de iniciar meu atendimento com Geísa Raupp.`}
                    >
                      {person.cta}
                    </WhatsAppLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="bg-[#E9E1D5] px-5 py-20 sm:px-8 sm:py-32 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="lg:sticky lg:top-10">
          <SectionHeading
            eyebrow="Atendimento"
            titleId="contato-title"
            title="Conte como você deseja viver o seu próximo ambiente."
          >
            <p>
              Envie um briefing inicial para que a Finger Santa Cruz do Sul
              compreenda seu momento, suas referências e a atmosfera que você
              imagina para a casa.
            </p>
          </SectionHeading>

          <div className="mt-10 grid gap-6 font-display text-lg font-light leading-8 text-[#403D39]/76 sm:grid-cols-2 xl:grid-cols-3">
            <div className="border-t border-[#403D39]/16 pt-6">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-normal text-[#252422]">
                Primeiro atendimento
              </p>
              <p className="mt-4">
                Uma conversa para entender rotina, obra, medidas e intenção
                estética antes de qualquer desenho.
              </p>
            </div>
            <div className="border-t border-[#403D39]/16 pt-6">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-normal text-[#252422]">
                Santa Cruz do Sul
              </p>
              <p className="mt-4">
                Atendimento consultivo para projetos residenciais e
                corporativos de alto padrão na região.
              </p>
            </div>
            <div className="border-t border-[#403D39]/16 pt-6">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-normal text-[#252422]">
                Horário
              </p>
              <p className="mt-4">{FINGER_SANTA_CRUZ_HOURS}</p>
            </div>
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}

function PremiumFooter() {
  return (
    <footer className="bg-[#403D39] px-5 pb-28 pt-16 text-[#FFFCF2] sm:px-8 sm:pb-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-[#FFFCF2]/14 pb-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <Image
              src="/finger-logo.svg"
              alt="Finger Móveis Planejados"
              width={152}
              height={67}
              className="h-auto w-36"
            />
            <p className="mt-5 text-[0.62rem] font-bold uppercase tracking-normal text-[#FFFCF2]/52">
              Ambientes Personalizados
            </p>
            <p className="mt-9 max-w-md font-display text-3xl font-light leading-tight text-[#FFFCF2]">
              Bem-estar em cada detalhe.
            </p>
            <p className="mt-6 max-w-md font-display text-lg font-light leading-8 text-[#FFFCF2]/62">
              Finger Santa Cruz do Sul. Design europeu, precisão alemã e
              ambientes criados para acolher sua essência.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {localSocialLinks.map(([label, href, icon]) => (
                <a
                  aria-label={`${label} da Finger Santa Cruz do Sul`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#FFFCF2]/16 text-[#FFFCF2]/68 transition duration-300 hover:border-[#C44E2A] hover:bg-[#C44E2A] hover:text-white"
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FooterContact />
            <FooterEnvironments />
            <FooterSac />
          </div>
        </div>

        <div className="flex flex-col gap-5 py-7 text-xs uppercase tracking-normal text-[#FFFCF2]/48 md:flex-row md:items-center md:justify-between">
          <span>2026 © Finger Santa Cruz do Sul</span>
          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-[#FFFCF2]" href="https://finger.ind.br/politica-de-privacidade/" target="_blank" rel="noopener noreferrer">
              Privacidade Finger
            </a>
            <WhatsAppLink
              id="cta-whatsapp-footer"
              aria-label="Conversar com um especialista da Finger Santa Cruz do Sul pelo WhatsApp"
              className="text-[#FFFCF2] transition hover:text-[#C44E2A]"
              message={whatsappMessage}
            >
              Converse com um especialista
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterContact() {
  return (
    <div>
      <FooterTitle>Unidade Santa Cruz do Sul</FooterTitle>
      <div className="mt-5 space-y-5 text-sm font-bold leading-6 text-[#FFFCF2]/70">
        <p>
          <span className="block text-[#FFFCF2]/42">WhatsApp local</span>
          {FINGER_SANTA_CRUZ_WHATSAPP_DISPLAY}
        </p>
        <address className="not-italic">
          <span className="block text-[#FFFCF2]/42">Showroom</span>
          {showroomAddressLines.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </address>
        <p>
          <span className="block text-[#FFFCF2]/42">Atendimento</span>
          {FINGER_SANTA_CRUZ_HOURS}
        </p>
      </div>
    </div>
  );
}

function FooterEnvironments() {
  return (
    <div>
      <FooterTitle>Ambientes</FooterTitle>
      <ul className="mt-5 space-y-3">
        {footerEnvironments.map((label) => (
          <li key={label}>
            <span className="text-sm font-bold text-[#FFFCF2]/70">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSac() {
  return (
    <div>
      <FooterTitle>SAC oficial Finger</FooterTitle>
      <div className="mt-5 space-y-5 text-sm font-bold leading-6 text-[#FFFCF2]/62">
        <p>
          0800.703.3072
          <br />
          sac@finger.ind.br
        </p>
        <p>
          <span className="block text-[#FFFCF2]/36">Fábrica Finger</span>
          Sarandi-RS
        </p>
      </div>
    </div>
  );
}

function SocialIcon({
  icon,
}: {
  icon: (typeof localSocialLinks)[number][2];
}) {
  if (icon === "facebook") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.1 8.1V6.4c0-.8.3-1.2 1.2-1.2h1.8V2.1A24 24 0 0 0 14.5 2c-2.6 0-4.4 1.6-4.4 4.5v1.6H7.2v3.5h2.9V22h3.6V11.6h3l.5-3.5h-3.1Z" />
      </svg>
    );
  }

  if (icon === "pinterest") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.1 2C6.6 2 3 5.8 3 10c0 2.6 1.4 4.8 3.5 5.6.3.1.6-.1.7-.5l.3-1.4c.1-.4 0-.5-.2-.8-.7-.8-1.1-1.8-1.1-3 0-2.8 2.1-5.4 5.7-5.4 3.1 0 5 1.9 5 4.7 0 3.2-1.6 5.4-3.6 5.4-1.1 0-2-.9-1.7-2.1.3-1.4 1-3 1-4 0-.9-.5-1.7-1.5-1.7-1.2 0-2.1 1.2-2.1 2.8 0 1 .3 1.7.3 1.7l-1.4 5.8c-.2.9-.2 2.1-.1 3 .1.4.6.5.8.2.4-.7 1-1.9 1.2-2.8l.6-2.3c.5.9 1.6 1.6 2.9 1.6 3.8 0 6.7-3.5 6.7-8C20.1 5.3 17 2 12.1 2Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.3 6.8h.01" strokeLinecap="round" />
    </svg>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[0.58rem] font-bold uppercase tracking-normal text-[#FFFCF2]/42">
      {children}
    </h2>
  );
}

function MobileWhatsApp() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:hidden">
      <WhatsAppLink
        id="cta-whatsapp-mobile-sticky"
        aria-label="Iniciar atendimento pelo WhatsApp com a Finger Santa Cruz do Sul"
        className="flex min-h-14 items-center justify-center rounded-full bg-[#C44E2A] px-6 text-sm font-bold text-white shadow-[0_18px_50px_rgba(37,36,34,0.26)]"
        message={whatsappMessage}
      >
        Quero meu espaço Finger
      </WhatsAppLink>
    </div>
  );
}
