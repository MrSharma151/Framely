/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ Required in Next.js 15
    autoprefixer: {},
  },
};
