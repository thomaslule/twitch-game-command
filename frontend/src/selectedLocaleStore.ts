export function getSelectedLocale() {
  const locale = localStorage.getItem("locale");
  if (!locale) {
    setSelectedLocale("en");
    return "en";
  }
  return locale;
}

export function setSelectedLocale(locale: string) {
  localStorage.setItem("locale", locale);
}
