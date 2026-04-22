import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { brand: {
        50:"#f4f7fb",100:"#e7eef8",200:"#c8daf0",300:"#9dc0e4",400:"#6ba1d3",
        500:"#477fbb",600:"#35659b",700:"#2c517d",800:"#284467",900:"#253a56"
      }},
      boxShadow: { soft:"0 10px 30px rgba(15,23,42,0.08)"}
    }
  },
  plugins: []
};
export default config;
