import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['var(--font-roboto)'],
            },
            colors: {
                'screen-login': '#1B2335',
                blue: {
                    light: '#253C53',
                    middle: '#293751',
                    dark: '#1C2537',
                },
                gray: {
                    light: '#FCFBFA',
                    middle: '#F6F7F9',
                    dark: '#ddd',
                },
            },
        },
    },
    plugins: [],
};
export default config;
