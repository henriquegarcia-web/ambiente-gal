/** @type {import('tailwindcss').Config} */
export const darkMode = "class";
export const content = [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
];
export const theme = {
    colors: {
        primary: {
            300: "#4FB1B7",
            400: "#50B795"
        },
        secondary: {
            400: "#4D5AA3",
            500: "#5660B0",
            600: "#6771B8",
            900: "#6100C2"
        },
        "bg-course": "#01171F",
        modal: {
            "dark-input-disable": "#0F0F0F",
            "dark-input": "#2B2A33",
            "input-disable": "rgba(0,0,0,0.2)",
            background: "rgba(0, 0, 0, 0.4)",
            close: "rgba(0,0,0,0.1)"
        },
        white: {
            100: "rgba(255, 255, 255, 0.1)",
            300: "rgba(255, 255, 255, 0.6)",
            400: "#fff",
            icons: "#E5E2E5",
            text: "#FEF9FB",
            box: "#F9F9F9"
        },
        black: {
            100: "rgba(0,0,0,0.03)",
            300: "#222222",
            400: "#00171F",
            600: "#0D0D0D",
            border: "#26211A",
            box: "#131313"
        },
        gray: {
            400: "#7A7A7A",
            500: "#797980",
            border: "#EAEAEA",
            sale: "#EFECE8",
            "sale-dark": "#26211A",
            bar: "#E6ECF6",
            text: "#616F81",
            muted: "#ACB9C9"
        },
        sidebar: {
            "dark-hover-items": "#62BEA0",
            "hover-items": "#032430",
            "dark-menu": "#131313",
            menu: "#01171F"
        },
        green: {
            400: "#44C13C"
        },
        red: {
            400: "#FF513A"
        },
        yellow: {
            400: "#FFCF0F",
            headbar: "#FACA15",
            "headbar-dark": "#FBCE2E"
        },
        dashboard: {
            icon: "#9B9B9B",
            title: "#7A7A7A"
        },
        donut: {
            icon: "#D9EAFF",
            "icon-dark": "#001D3F"
        },
        checkout: {
            bg: "#01171F",
            box: "#021A23",
            border: "#05222D",
            input: "#062734",
            gray: "#707780",
            disabled: "#03222F"
        },
        watch: {
            box: "#021e28",
            search: "#292A32",
            "text-search": "#92929D",
            bar: "#3A3A49",
            "gray-time": "#7B8392",
            selected: "#007AFF0F",
            title: "#1F2029",
            download: "#292932"
        }
    },
    extend: {
        backgroundImage: {
            hive: "url(/images/background.png)",
            banner: "url(/images/banner.png)"
        },
        height: {
            "90vh": "90vh"
        },
        keyframes: {
            disappear: {
                "0%": { opacity: 1 },
                "100%": { opacity: 0 }
            },
            appear: {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 }
            }
        },
        animation: {
            disappear: "disappear 1s ease forwards",
            appear: "appear 1s ease forwards"
        }
    }
};
export const plugins = [];
