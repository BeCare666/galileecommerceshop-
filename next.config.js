/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'], // 🔹 détecte src/pages
  exportPathMap: async function (defaultPathMap) { // 🔹 exclut /products/tags
    if (defaultPathMap['/products/tags']) {
      delete defaultPathMap['/products/tags'];
    }
    return defaultPathMap;
  },
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      '127.0.0.1:8000',
      'maps.googleapis.com',
      's3.amazonaws.com',
      'pixarlaravel.s3.ap-southeast-1.amazonaws.com',
      'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
      'galileecommerce.netlify.app',
      '192.168.198.170',
      'flagcdn.com',
      'img.icons8.com',
      '192.168.243.170',
      'galileecommerceshopapi-3.onrender.com',
    ],
    unoptimized: true,
  },
  ...(process.env.APPLICATION_MODE === 'production' && {
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
  }),
};
