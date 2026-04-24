import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#fdf6e3",100:"#fbecc4",200:"#f7dc92",300:"#f2c65c",400:"#edab30",
          500:"#d88f1a",600:"#ba7517",700:"#945a15",800:"#6e4411",900:"#412402"
        },
        cream: {
          50:"#fffbf0",100:"#fdf6e3",200:"#fbf0d2",300:"#f7e7b8"
        },
        coral: {
          100:"#fde6d9",200:"#f5c4b3",300:"#f0997b",400:"#d85a30",500:"#993c1d"
        }
      },
      boxShadow: { soft:"0 10px 30px rgba(120,72,15,0.08)"}
    }
  },
  plugins: []
};
export default config;
