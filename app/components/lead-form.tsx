"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  formatBrazilianPhone,
  limitPhoneDigits,
  validateEmail,
  validateMessage,
  validateName,
  validateRequiredSelect,
  validateWhatsApp,
} from "../lib/contact-validation";

const fieldClass =
  "min-h-14 w-full rounded-full border border-[#403D39]/12 bg-white/55 px-5 py-4 text-sm font-semibold text-[#252422] outline-none transition-colors placeholder:text-[#403D39]/42 focus:border-[#C44E2A] focus:bg-white";

const labelClass =
  "text-[0.62rem] font-bold uppercase tracking-normal text-[#403D39]/58";

const errorClass = "text-sm font-bold leading-5 text-[#C44E2A]";

type FieldName =
  | "nome"
  | "telefone"
  | "email"
  | "ambiente"
  | "momento"
  | "mensagem";

type FieldErrors = Partial<Record<FieldName, string>>;

function readValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function fieldClassName(error?: string, extraClass = "") {
  return `${fieldClass} ${
    error ? "border-[#C44E2A]/60 bg-white" : ""
  } ${extraClass}`;
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className={errorClass} id={id}>
      {message}
    </p>
  );
}

export function LeadForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phone, setPhone] = useState("");

  function setFieldError(field: FieldName, error: string) {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: error,
    }));
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = limitPhoneDigits(event.target.value);
    const formattedPhone = formatBrazilianPhone(digits);

    setPhone(formattedPhone);

    if (errors.telefone) {
      setFieldError("telefone", validateWhatsApp(formattedPhone));
    }
  }

  function validateFormData(formData: FormData) {
    const nextErrors: FieldErrors = {
      nome: validateName(readValue(formData, "nome")),
      telefone: validateWhatsApp(phone),
      email: validateEmail(readValue(formData, "email")),
      ambiente: validateRequiredSelect(
        readValue(formData, "ambiente"),
        "Selecione o ambiente de interesse.",
      ),
      momento: validateRequiredSelect(
        readValue(formData, "momento"),
        "Selecione o momento do projeto.",
      ),
      mensagem: validateMessage(readValue(formData, "mensagem")),
    };

    setErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (readValue(formData, "empresa")) {
      return;
    }

    setStatus("idle");

    const nome = readValue(formData, "nome");
    const telefone = phone;
    const email = readValue(formData, "email");
    const ambiente = readValue(formData, "ambiente");
    const momento = readValue(formData, "momento");
    const mensagem = readValue(formData, "mensagem");

    if (!validateFormData(formData)) {
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          telefone,
          email,
          ambiente,
          momento,
          mensagem,
          empresa: readValue(formData, "empresa"),
        }),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
      form.reset();
      setPhone("");
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <>
      <form
        id="lead-form"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSending}
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
              Nome *
            </label>
            <input
              aria-describedby={errors.nome ? "nome-error" : undefined}
              aria-invalid={Boolean(errors.nome)}
              className={fieldClassName(errors.nome)}
              id="nome"
              name="nome"
              placeholder="Seu nome"
              required
              autoComplete="name"
              onBlur={(event) =>
                setFieldError("nome", validateName(event.currentTarget.value))
              }
              onChange={(event) => {
                if (errors.nome) {
                  setFieldError(
                    "nome",
                    validateName(event.currentTarget.value),
                  );
                }
              }}
            />
            <ErrorMessage id="nome-error" message={errors.nome} />
          </div>

          <div className="grid gap-3">
            <label className={labelClass} htmlFor="telefone">
              WhatsApp *
            </label>
            <input
              aria-describedby={errors.telefone ? "telefone-error" : undefined}
              aria-invalid={Boolean(errors.telefone)}
              className={fieldClassName(errors.telefone)}
              id="telefone"
              name="telefone"
              placeholder="(51) 99999-9999"
              required
              inputMode="numeric"
              autoComplete="tel"
              value={phone}
              maxLength={15}
              onBlur={() => setFieldError("telefone", validateWhatsApp(phone))}
              onChange={handlePhoneChange}
            />
            <ErrorMessage id="telefone-error" message={errors.telefone} />
          </div>

          <div className="grid gap-3">
            <label className={labelClass} htmlFor="email">
              E-mail
            </label>
            <input
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              className={fieldClassName(errors.email)}
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              type="email"
              autoComplete="email"
              onBlur={(event) =>
                setFieldError("email", validateEmail(event.currentTarget.value))
              }
              onChange={(event) => {
                if (errors.email) {
                  setFieldError(
                    "email",
                    validateEmail(event.currentTarget.value),
                  );
                }
              }}
            />
            <ErrorMessage id="email-error" message={errors.email} />
          </div>

          <div className="grid gap-3">
            <label className={labelClass} htmlFor="ambiente">
              Ambiente *
            </label>
            <select
              aria-describedby={errors.ambiente ? "ambiente-error" : undefined}
              aria-invalid={Boolean(errors.ambiente)}
              className={fieldClassName(errors.ambiente)}
              id="ambiente"
              name="ambiente"
              required
              onBlur={(event) =>
                setFieldError(
                  "ambiente",
                  validateRequiredSelect(
                    event.currentTarget.value,
                    "Selecione o ambiente de interesse.",
                  ),
                )
              }
              onChange={(event) => {
                if (errors.ambiente) {
                  setFieldError(
                    "ambiente",
                    validateRequiredSelect(
                      event.currentTarget.value,
                      "Selecione o ambiente de interesse.",
                    ),
                  );
                }
              }}
            >
              <option value="">Selecione</option>
              <option>Cozinha gourmet</option>
              <option>Living e home theater</option>
              <option>Closet ou dormitório</option>
              <option>Banheiro</option>
              <option>Lavanderia</option>
              <option>Projeto completo</option>
              <option>Ambiente corporativo</option>
            </select>
            <ErrorMessage id="ambiente-error" message={errors.ambiente} />
          </div>

          <div className="grid gap-3">
            <label className={labelClass} htmlFor="momento">
              Momento *
            </label>
            <select
              aria-describedby={errors.momento ? "momento-error" : undefined}
              aria-invalid={Boolean(errors.momento)}
              className={fieldClassName(errors.momento)}
              id="momento"
              name="momento"
              required
              onBlur={(event) =>
                setFieldError(
                  "momento",
                  validateRequiredSelect(
                    event.currentTarget.value,
                    "Selecione o momento do projeto.",
                  ),
                )
              }
              onChange={(event) => {
                if (errors.momento) {
                  setFieldError(
                    "momento",
                    validateRequiredSelect(
                      event.currentTarget.value,
                      "Selecione o momento do projeto.",
                    ),
                  );
                }
              }}
            >
              <option value="">Selecione</option>
              <option>Estou construindo</option>
              <option>Estou reformando</option>
              <option>Recebi o apartamento/casa</option>
              <option>Quero renovar meus ambientes</option>
              <option>Sou arquiteto(a) ou designer</option>
            </select>
            <ErrorMessage id="momento-error" message={errors.momento} />
          </div>

          <div className="grid gap-3">
            <label className={labelClass} htmlFor="mensagem">
              Briefing
            </label>
            <textarea
              aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
              aria-invalid={Boolean(errors.mensagem)}
              className={fieldClassName(
                errors.mensagem,
                "min-h-32 resize-none rounded-[18px] bg-white/62 py-5 leading-6 sm:rounded-[20px]",
              )}
              id="mensagem"
              name="mensagem"
              maxLength={700}
              placeholder="Conte quais ambientes você quer planejar"
              onBlur={(event) =>
                setFieldError(
                  "mensagem",
                  validateMessage(event.currentTarget.value),
                )
              }
              onChange={(event) => {
                if (errors.mensagem) {
                  setFieldError(
                    "mensagem",
                    validateMessage(event.currentTarget.value),
                  );
                }
              }}
            />
            <ErrorMessage id="mensagem-error" message={errors.mensagem} />
          </div>
        </div>

        <button
          className="mt-9 flex min-h-14 w-full items-center justify-center rounded-full bg-[#C44E2A] px-6 text-sm font-bold text-white transition duration-300 hover:bg-[#252422] focus:outline-none focus:ring-2 focus:ring-[#C44E2A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          data-conversion="google-ads-lead"
          disabled={isSending}
        >
          {isSending ? "Enviando..." : "Quero meu espaço Finger"}
        </button>

        <p className="mt-5 font-display text-sm leading-6 text-[#403D39]/60">
          Seu briefing inicial ajuda a compreender rotina, ambiente e atmosfera
          desejada antes da primeira conversa.
        </p>

        <p
          className={`mt-4 min-h-6 text-sm font-bold ${
            status === "error" ? "text-[#C44E2A]" : "text-[#25816D]"
          }`}
          aria-live="polite"
        >
          {status === "error"
            ? "Não conseguimos enviar sua mensagem neste momento. Por favor, tente novamente ou entre em contato pelo WhatsApp."
            : ""}
        </p>
      </form>

      {status === "success" ? (
        <div
          aria-modal="true"
          aria-labelledby="lead-success-title"
          aria-describedby="lead-success-description"
          className="fixed inset-0 z-[70] grid place-items-center bg-[#252422]/60 px-5 backdrop-blur-sm"
          role="dialog"
        >
          <div className="max-w-md border border-[#403D39]/12 bg-[#FFFCF2] p-7 text-[#403D39] shadow-[0_28px_90px_rgba(37,36,34,0.26)] sm:p-9">
            <p className="text-[0.62rem] font-bold uppercase tracking-normal text-[#C44E2A]">
              Solicitação recebida
            </p>
            <p
              id="lead-success-title"
              className="mt-5 font-display text-2xl font-normal leading-tight text-[#252422]"
            >
              Mensagem enviada com sucesso.
            </p>
            <p
              id="lead-success-description"
              className="mt-4 font-display text-lg font-light leading-8 text-[#403D39]/76"
            >
              Recebemos suas informações e em breve a equipe da Finger Santa
              Cruz do Sul entrará em contato.
            </p>
            <button
              className="mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-[#C44E2A] px-6 text-sm font-bold text-white transition duration-300 hover:bg-[#252422]"
              type="button"
              onClick={() => setStatus("idle")}
            >
              Entendi
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
