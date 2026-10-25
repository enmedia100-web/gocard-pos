import type { PaymentMethodDto } from "./orders";
import type { TaxRegime } from "./tax";

// Per-country defaults (GoCard, 2026-10-26). Picking a country in Settings
// suggests these; nothing here changes pricing math on its own. Bangladesh
// is GoCard's home market and the fallback for unknown countries.

export interface CountryDefaults {
  country: string;
  displayName: string;
  currency: string;
  timezone: string;
  taxRegime: TaxRegime;
  /** Counter payment methods offered at checkout, most used first. */
  paymentMethods: PaymentMethodDto[];
}

export const COUNTRY_DEFAULTS: Record<string, CountryDefaults> = {
  BD: {
    country: "BD",
    displayName: "Bangladesh",
    currency: "BDT",
    timezone: "Asia/Dhaka",
    taxRegime: "BD_VAT",
    paymentMethods: ["CASH", "BKASH", "NAGAD", "ROCKET", "CARD", "OTHER"],
  },
  IN: {
    country: "IN",
    displayName: "India",
    currency: "INR",
    timezone: "Asia/Kolkata",
    taxRegime: "INDIA_GST",
    paymentMethods: ["CASH", "CARD", "UPI", "OTHER"],
  },
  US: {
    country: "US",
    displayName: "United States",
    currency: "USD",
    timezone: "America/New_York",
    taxRegime: "US_SALES_TAX",
    paymentMethods: ["CASH", "CARD", "OTHER"],
  },
  ES: {
    country: "ES",
    displayName: "Spain",
    currency: "EUR",
    timezone: "Europe/Madrid",
    taxRegime: "ES_IVA",
    paymentMethods: ["CASH", "CARD", "OTHER"],
  },
};

export const DEFAULT_COUNTRY = "BD";

export function countryDefaults(country: string | null | undefined): CountryDefaults {
  return COUNTRY_DEFAULTS[(country ?? "").toUpperCase()] ?? {
    ...COUNTRY_DEFAULTS[DEFAULT_COUNTRY],
    country: (country ?? DEFAULT_COUNTRY).toUpperCase(),
    displayName: (country ?? DEFAULT_COUNTRY).toUpperCase(),
    paymentMethods: ["CASH", "CARD", "OTHER"],
  };
}

/** Checkout methods for a branch's country. */
export function paymentMethodsFor(country: string | null | undefined): PaymentMethodDto[] {
  return countryDefaults(country).paymentMethods;
}

/** Mobile financial services (bKash, Nagad, Rocket): paid to a merchant number, not in cash. */
export const MOBILE_WALLET_METHODS = ["BKASH", "NAGAD", "ROCKET"] as const satisfies readonly PaymentMethodDto[];

/**
 * Locale used to display a currency. Taka and rupees use lakh/crore grouping
 * (12,34,567.50), which en-IN gives with Latin digits; en-BD would group in
 * thousands and bn-BD would switch to Bangla digits.
 */
export function displayLocaleFor(currency: string): string {
  switch (currency) {
    case "BDT":
    case "INR":
      return "en-IN";
    case "EUR":
      return "es-ES";
    default:
      return "en-US";
  }
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  BDT: "৳",
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

/** Symbol for a currency, or its code and a space ("AED ") when there is none here. */
export function currencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] ?? `${currency} `;
}

/** "৳1,250" / "৳12,34,567.50": short money text for notifications and messages. */
export function formatMoney(amount: number | string, currency: string): string {
  const n = typeof amount === "string" ? Number(amount) : amount;
  return `${currencySymbol(currency)}${n.toLocaleString(displayLocaleFor(currency), {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: "Cash",
  CARD: "Card",
  UPI: "UPI",
  BKASH: "bKash",
  NAGAD: "Nagad",
  ROCKET: "Rocket",
  WALLET: "Wallet",
  BANK_TRANSFER: "Bank transfer",
  GIFT_CARD: "Gift card",
  STORE_CREDIT: "Store credit",
  OTHER: "Other",
};

/** "BKASH" -> "bKash", for receipts and screens. */
export function paymentMethodLabel(method: string): string {
  return PAYMENT_METHOD_LABELS[method] ?? method;
}
