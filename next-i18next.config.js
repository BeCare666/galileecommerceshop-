const invariant = require('tiny-invariant');
const path = require('path');

// valeur par défaut si la variable n’existe pas
const defaultLang = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en';

invariant(
  defaultLang,
  'NEXT_PUBLIC_DEFAULT_LANGUAGE is required, but not set, check your .env file',
);

const isMultilangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
  !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

function generateLocales() {
  if (isMultilangEnable) {
    const locales = process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES.split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    return locales.length > 0 ? locales : [defaultLang];
  }
  return [defaultLang];
}

module.exports = {
  i18n: {
    defaultLocale: defaultLang,
    locales: generateLocales(),
    localeDetection: isMultilangEnable,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
