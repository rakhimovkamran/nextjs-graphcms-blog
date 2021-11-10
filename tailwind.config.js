module.exports = {
    purge: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./sections/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            margin: ["last"],
        },
    },
    plugins: [],
}
