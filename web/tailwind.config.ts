import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#5048e5",
                    foreground: "#ffffff",
                    50: "#f5f5fe",
                    100: "#ebeafe",
                    200: "#dad8fd",
                    300: "#c0bcfa",
                    400: "#9f97f7",
                    500: "#5048e5",
                    600: "#6052e0",
                    700: "#5143cc",
                    800: "#4438a7",
                    900: "#3a3186",
                    950: "#221d4f",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            screens: {
                'xs': '480px',
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
};
export default config;
