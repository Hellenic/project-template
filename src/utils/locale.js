import enMessages from "../i18n/en.json";
import fiMessages from "../i18n/fi.json";

// Modify this to add/remove locales from the application
const LOCALE_MESSAGES = {
  en: enMessages,
  fi: fiMessages,
};
const APP_LOCALES = Object.keys(LOCALE_MESSAGES);

export function determineLocale(req, res) {
  return getLocale(APP_LOCALES)(req, res);
}

export function determineClientLocale(req, res) {
  return getClientLocale(APP_LOCALES)(req, res);
}

export function getLocaleMessages(localeCode) {
  return LOCALE_MESSAGES[localeCode];
}

export const getLocale = (appLocales) => (req, res) => {
  // Check if URL already contains the locale, but just not the trailing slash
  if (
    req.originalUrl.match(/\/\w{2}$/) &&
    appLocales.includes(req.originalUrl.substring(1, 3))
  ) {
    res.redirect(307, `${req.originalUrl}/`);
    return false;
  }
  // Determine preferred locale and redirect, if it's not set in the URL already
  // Super simple guessing of locale and redirection
  if (!appLocales.some((code) => req.originalUrl.startsWith(`/${code}`))) {
    let localeCode = req.acceptsLanguages(appLocales) || appLocales[0];
    const localePath = `/${localeCode}`;
    res.redirect(307, localePath + req.originalUrl);
    return false;
  }

  // After this, we use the locale defined in the URL, so user is able to determine their wanted locale
  return req.originalUrl.substring(1, 3);
};

export const getClientLocale = (appLocales) => () => {
  if (typeof window === "undefined") {
    return appLocales[0];
  }

  const attemptedLocale = window.location.pathname.substring(1, 3);
  if (appLocales.includes(attemptedLocale)) {
    return attemptedLocale;
  }

  return appLocales[0];
};
