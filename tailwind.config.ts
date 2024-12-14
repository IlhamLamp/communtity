import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Purple: "#DCD6F7",
        PurpleLight: "#F4EEFF",
        PurpleDark: "#640D5F",
        NavyLight: "#A6B1E1",
        Navy: "#424874",
        Yellow: "#FAE27C",
        Red: "#D24545",
        Gray: "#D6E4E5",
        CardOne: "#F38181",
        CardTwo: "#FCE38A",
        CardThree: "#EAFFD0",
        CardFour: "#95E1D3",
      },
    },
  },
  plugins: [],
};
export default config;
