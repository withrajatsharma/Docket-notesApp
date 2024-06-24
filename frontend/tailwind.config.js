/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors:{
        primary:"#8b8c8c",
        // primary:"#2B85FF",
        // secondary:"#EF863E"
        secondary:"#c4c4c4",
        textclr:"#545454"
      }
    },
  },
  plugins: [],
}

