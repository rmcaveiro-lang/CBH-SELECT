import { site } from "./config";
import { track } from "./analytics";

/* Adaptador de lead. V1: abre o WhatsApp comercial com a mensagem pronta.
   Futuro: trocar o corpo desta função por uma chamada ao CRM. */

export interface Lead {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  message: string;
  summary: string[]; // linhas já formatadas da seleção
  link: string;
  ids: string[];
}

export function leadMessage(l: Lead) {
  const lines = [
    "Olá, quero conversar sobre uma parceria com a CBH.",
    "",
    `Nome: ${l.name}`,
    `Empresa: ${l.company}`,
    l.role ? `Cargo: ${l.role}` : null,
    l.email ? `E-mail: ${l.email}` : null,
    l.phone ? `Telefone: ${l.phone}` : null,
    "",
    "Meu projeto:",
    ...l.summary,
    "",
    l.message ? `Mensagem: ${l.message}` : null,
    `Link do projeto: ${l.link}`,
  ];
  return lines.filter((x): x is string => x !== null).join("\n");
}

export function whatsappHref(text: string) {
  const n = site.whatsapp.replace(/\D/g, "");
  const q = `text=${encodeURIComponent(text)}`;
  return n ? `https://wa.me/${n}?${q}` : `https://wa.me/?${q}`;
}

export function submitLead(l: Lead) {
  track("lead_submit", { ids: l.ids, company: l.company });
  window.open(whatsappHref(leadMessage(l)), "_blank", "noopener");
}
