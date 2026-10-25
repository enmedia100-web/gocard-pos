"use client";

import { Fragment } from "react";
import { useBranch } from "@/hooks/use-branch";
import { useSettings } from "@/hooks/use-settings";
import { getDisplayCurrency, setDisplayCurrency } from "@/lib/format";

// Keeps formatCurrency's default in step with the restaurant's currency.
// It is set here, during render and before the page below renders, so the
// page formats with it straight away; setting it is idempotent. When the
// currency changes (first visit on a device, or the owner switches it in
// Settings) the key re-mounts the page once so every amount is redrawn.
export function CurrencyScope({ children }: { children: React.ReactNode }) {
  const { branchId } = useBranch();
  const { data } = useSettings(branchId);
  const currency = data?.restaurant.currency ?? getDisplayCurrency();
  if (currency !== getDisplayCurrency()) setDisplayCurrency(currency);

  return <Fragment key={currency}>{children}</Fragment>;
}
