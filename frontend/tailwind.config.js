/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        jost: ['Jost', 'sans-serif'],
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'roboto': ['roboto'],
        'nunito': ['nunito']
      }
    },
  },
  plugins: [],
}