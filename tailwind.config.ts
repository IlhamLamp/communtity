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
        // lamaSky: "#C3EBFA",
        // lamaSkyLight: "#EDF9FD",
        // lamaPurple: "#CFCEFF",
        // lamaPurpleLight: "#F1F0FF",
        // lamaYellow: "#FAE27C",
        // lamaYellowLight: "#FEFCE8",
        Purple: "#DCD6F7",
        PurpleLight: "#F4EEFF",
        NavyLight: "#A6B1E1",
        Navy: "#424874",
        Yellow: "#FAE27C",
        Red: "#D24545",
        Gray: "#D6E4E5",
      },
    },
  },
  plugins: [
  ],
};
export default config;
