/** @type {import('tailwindcss').Config} */
export default {
          content: [
                    "./index.html",
                    "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
                    extend: {
                              colors: {
                                        'surface-beige': '#F5F0EA',
                                        'charcoal': '#181919',
                              },
                              fontFamily: {
                                        display: ['"Cormorant Garamond"', 'serif'],
                                        body: ['"Inter"', 'sans-serif'],
                              },
                    },
          },
          plugins: [],
}