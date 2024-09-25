/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
      width: {
        '128': '32rem',
        '130': '35rem',
        '140': '40rem',
      },
      minWidth: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}