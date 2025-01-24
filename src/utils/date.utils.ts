export function reverseDate(input: string): string {
  return input.split("-").reverse().join("-");
}

export function formatDate(input: string): string {
  return new Date(input).toLocaleDateString("nl-NL");
}