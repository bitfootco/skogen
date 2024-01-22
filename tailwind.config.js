/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['var(--font-header)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}

