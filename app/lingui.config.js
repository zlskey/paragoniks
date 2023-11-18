/** @type {import('@lingui/conf').LinguiConfig} */

module.exports = {
  locales: ['en', 'pl'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'src/helpers/i18n/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: 'po',
  plugins: ['macros'],
  extractBabelOptions: {
    presets: ['@babel/preset-typescript', '@babel/preset-react'],
  },
}
