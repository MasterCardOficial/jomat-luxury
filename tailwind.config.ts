import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["var(--font-montserrat)"],
                playfair: ["var(--font-playfair)"],
                inter: ["var(--font-inter)"],
                poppins: ["var(--font-poppins)"],
            },
        },
    },
    plugins: [],
} satisfies Config;
