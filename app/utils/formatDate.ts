export function dateFormat(
  dateString: string,
  locale: string = "en-US",
): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
