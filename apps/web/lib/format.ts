import { displayLocaleFor } from "@nodedr-restaurant/types";

// The restaurant's currency, used when a caller does not pass one. Most
// screens just call formatCurrency(amount), so this is set once from the
// restaurant settings (CurrencyScope in the app shell) and remembered in
// localStorage so other windows on the same device (the customer display)
// and the next page load start with the right symbol. GoCard defaults to taka.
const STORAGE_KEY = "gocard-currency";
let displayCurrency: string | null = null;

export function getDisplayCurrency(): string {
  if (displayCurrency) return displayCurrency;
  try {
    displayCurrency = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) || "BDT";
  } catch {
    displayCurrency = "BDT";
  }
  return displayCurrency;
}

export function setDisplayCurrency(currency: string): void {
  displayCurrency = currency;
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // Private mode or blocked storage: this window still uses it.
  }
}

export function formatCurrency(
  value: number | string,
  currency: string = getDisplayCurrency(),
  locale: string = displayLocaleFor(currency),
): string {
  const amount = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    // "৳" rather than "BDT", "$" rather than "US$".
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  }).format(amount);
}
