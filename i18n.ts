const NextI18Next = require('next-i18next').default;

const { i18n, appWithTranslation } = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['ja'],
});

export { i18n, appWithTranslation };
