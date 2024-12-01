import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
        background: "#0d151f",
        foreground: "#DD5F32",
				highlight: "#FF9F60"
      },
  		},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
