/**
 * Formats a given number into a localized currency string.
 *
 * @param {number} amount - The amount to format.
 * @param {string} [locale="nl-NL"] - The locale for formatting (default is "nl-NL").
 * @param {string} [currency="EUR"] - The currency code for formatting (default is "EUR").
 * @returns {string} A formatted currency string based on the provided locale and currency.
 */
export const formatCurrency = (
  amount: number,
  locale = "nl-NL",
  currency = "EUR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
