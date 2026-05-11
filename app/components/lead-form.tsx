"use client";

import { FormEvent, useState } from "react";
import { DEFAULT_WHATSAPP_MESSAGE, buildWhatsappHref } from "./whatsapp-link";

const fieldClass =
  "min-h-14 w-full rounded-full border border-[#403D39]/12 bg-white/55 px-5 py-4 text-sm font-semibold text-[#252422] outline-none transition-colors placeholder:text-[#403D39]/42 focus:border-[#C44E2A] focus:bg-white";

const labelClass =
  "text-[0.62rem] font-bold uppercase tracking-normal text-[#403D39]/58";

function readValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (readValue(formData, "empresa")) {
      return;
    }

    const nome = readValue(formData, "nome");
    const telefone = readValue(formData, "telefone");
    const ambiente = readValue(formData, "ambiente");
    const momento = readValue(formData, "momento");
    const mensagem = readValue(formData, "mensagem");

    const leadMessage = [
      DEFAULT_WHATSAPP_MESSAGE,
      "",
      "Vim pela landing page e quero iniciar meu projeto.",
      "",
      nome ? `Nome: ${nome}` : "",
      telefone ? `WhatsApp: ${telefone}` : "",
      ambiente ? `Ambiente desejado: ${ambiente}` : "",
      momento ? `Momento do projeto: ${momento}` : "",
      mensagem ? `Detalhes: ${mensagem}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsappHref(leadMessage), "_blank", "noopener,noreferrer");
    setStatus("sent");
    form.reset();
  }

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className="border border-white/70 bg-[#FFFCF2]/72 p-6 shadow-[0_28px_90px_rgba(64,61,57,0.11)] backdrop-blur-sm sm:p-8 lg:p-10"
    >
      <input
        aria-hidden="true"
        className="hidden"
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-7">
        <div className="grid gap-3">
          <label className={labelClass} htmlFor="nome">
            Nome
          </label>
          <input
            className={fieldClass}
            id="nome"
            name="nome"
            placeholder="Seu nome"
            required
            autoComplete="name"
          />
        </div>

        <div className="grid gap-3">
          <label className={labelClass} htmlFor="telefone">
            WhatsApp
          </label>
          <input
            className={fieldClass}
            id="telefone"
            name="telefone"
            placeholder="Seu WhatsApp"
            required
            inputMode="tel"
            autoComplete="tel"
          />
        </div>

        <div className="grid gap-3">
          <label className={labelClass} htmlFor="ambiente">
            Ambiente
          </label>
          <select className={fieldClass} id="ambiente" name="ambiente" required>
            <option value="">Selecione</option>
            <option>Cozinha gourmet</option>
            <option>Living e home theater</option>
            <option>Closet ou dormitório</option>
            <option>Banheiro</option>
            <option>Lavanderia</option>
            <option>Projeto completo</option>
            <option>Ambiente corporativo</option>
          </select>
        </div>

        <div className="grid gap-3">
          <label className={labelClass} htmlFor="momento">
            Momento
          </label>
          <select className={fieldClass} id="momento" name="momento" required>
            <option value="">Selecione</option>
            <option>Estou construindo</option>
            <option>Estou reformando</option>
            <option>Recebi o apartamento/casa</option>
            <option>Quero renovar meus ambientes</option>
            <option>Sou arquiteto(a) ou designer</option>
          </select>
        </div>

        <div className="grid gap-3">
          <label className={labelClass} htmlFor="mensagem">
            Briefing
          </label>
          <textarea
            className={`${fieldClass} min-h-32 resize-none rounded-[18px] bg-white/62 py-5 leading-6 sm:rounded-[20px]`}
            id="mensagem"
            name="mensagem"
            placeholder="Conte quais ambientes você quer planejar"
          />
        </div>
      </div>

      <button
        className="mt-9 flex min-h-14 w-full items-center justify-center rounded-full bg-[#C44E2A] px-6 text-sm font-bold text-white transition duration-300 hover:bg-[#252422] focus:outline-none focus:ring-2 focus:ring-[#C44E2A] focus:ring-offset-2"
        type="submit"
        data-conversion="google-ads-lead"
      >
        Quero meu espaço Finger
      </button>

      <p className="mt-5 font-display text-sm leading-6 text-[#403D39]/60">
        Seu briefing inicial ajuda a compreender rotina, ambiente e atmosfera
        desejada antes da primeira conversa.
      </p>

      <p className="mt-4 min-h-6 text-sm font-bold text-[#25816D]" aria-live="polite">
        {status === "sent"
          ? "O WhatsApp foi aberto com o briefing preenchido."
          : ""}
      </p>
    </form>
  );
}
