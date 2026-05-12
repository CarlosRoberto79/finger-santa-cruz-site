import {
  formatBrazilianPhone,
  onlyDigits,
  validateEmail,
  validateMessage,
  validateName,
  validateRequiredSelect,
  validateWhatsApp,
} from "../../lib/contact-validation";
import { CONTACT_FORM_RECIPIENTS } from "../../lib/site-config";

const EMAIL_SUBJECT = "Novo contato pelo site | Finger Santa Cruz do Sul";
const RESEND_ENDPOINT = "https://api.resend.com/emails";

type ContactPayload = {
  nome?: unknown;
  telefone?: unknown;
  email?: unknown;
  ambiente?: unknown;
  momento?: unknown;
  mensagem?: unknown;
  empresa?: unknown;
};

function readField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

function createEmailContent({
  nome,
  telefone,
  email,
  ambiente,
  momento,
  mensagem,
  submittedAt,
}: {
  nome: string;
  telefone: string;
  email: string;
  ambiente: string;
  momento: string;
  mensagem: string;
  submittedAt: string;
}) {
  const rows = [
    ["Nome do lead", nome],
    ["Telefone/WhatsApp", telefone],
    ["E-mail", email || "Não informado"],
    ["Ambiente de interesse", ambiente || "Não informado"],
    ["Momento do projeto", momento || "Não informado"],
    ["Mensagem ou observação", mensagem || "Não informado"],
    ["Data e horário do envio", submittedAt],
    ["Origem", "Site Finger Santa Cruz do Sul"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 14px 18px; border-bottom: 1px solid #eee7dc; color: #6f6961; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; font-weight: 700; vertical-align: top; width: 34%;">${escapeHtml(label)}</td>
          <td style="padding: 14px 18px; border-bottom: 1px solid #eee7dc; color: #252422; font-size: 15px; line-height: 1.55; vertical-align: top;">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="margin: 0; padding: 32px; background: #fffcf2; color: #252422; font-family: Arial, Helvetica, sans-serif;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #eee7dc;">
        <div style="padding: 28px 32px; background: #403d39; color: #fffcf2;">
          <p style="margin: 0 0 10px; color: #c44e2a; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700;">Finger Santa Cruz do Sul</p>
          <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 1.15; font-weight: 400;">Novo contato pelo site</h1>
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          <tbody>${htmlRows}</tbody>
        </table>
        <div style="padding: 22px 32px; color: #6f6961; font-size: 13px; line-height: 1.6;">
          Este lead foi enviado pelo formulário do site Finger Santa Cruz do Sul.
        </div>
      </div>
    </div>`;

  return { html, text };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Dados inválidos." }, { status: 400 });
  }

  if (readField(payload.empresa)) {
    return Response.json({ ok: true });
  }

  const nome = readField(payload.nome);
  const telefone = readField(payload.telefone);
  const email = readField(payload.email);
  const ambiente = readField(payload.ambiente);
  const momento = readField(payload.momento);
  const mensagem = readField(payload.mensagem);

  const validationErrors = [
    validateName(nome),
    validateWhatsApp(telefone),
    validateEmail(email),
    validateRequiredSelect(ambiente, "Selecione o ambiente de interesse."),
    validateRequiredSelect(momento, "Selecione o momento do projeto."),
    validateMessage(mensagem),
  ].filter(Boolean);

  if (validationErrors.length) {
    return Response.json(
      { message: "Revise os dados do formulário." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !from) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL.");
    return Response.json(
      { message: "Serviço de e-mail não configurado." },
      { status: 500 },
    );
  }

  const submittedAt = formatSubmittedAt();
  const { html, text } = createEmailContent({
    nome,
    telefone: formatBrazilianPhone(onlyDigits(telefone)),
    email,
    ambiente,
    momento,
    mensagem,
    submittedAt,
  });

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: CONTACT_FORM_RECIPIENTS,
      subject: EMAIL_SUBJECT,
      html,
      text,
      reply_to: email || undefined,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Resend contact email failed:", error);
    return Response.json(
      { message: "Não foi possível enviar o contato." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
