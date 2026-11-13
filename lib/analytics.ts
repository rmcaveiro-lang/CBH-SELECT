/* Eventos do briefing (seção 51). Prontos para GA4 ou GTM via dataLayer. */
export type AnalyticsEvent =
  | "ecosystem_open"
  | "property_view"
  | "property_add_selection"
  | "selection_remove"
  | "builder_start"
  | "builder_step"
  | "builder_complete"
  | "lead_submit"
  | "contact_click"
  | "share_selection";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
