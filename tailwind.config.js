import tokens from './src/theme/tokens.js';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: tokens.colors.primary,
                secondary: tokens.colors.secondary,
                accent: tokens.colors.accent,
                neutral: tokens.colors.neutral,
                status: tokens.colors.status,
                background: tokens.colors.background,
                text: tokens.colors.text,
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            fontSize: tokens.typography.fontSize,
            fontWeight: tokens.typography.fontWeight,
            lineHeight: tokens.typography.lineHeight,
            spacing: tokens.spacing,
            borderRadius: tokens.borderRadius,
            boxShadow: tokens.shadows,
            transitionDuration: {
                fast: '150ms',
                base: '200ms',
                slow: '300ms',
                slower: '500ms',
            },
            zIndex: tokens.zIndex,
            width: {
                sidebar: tokens.components.sidebar.width,
            },
            height: {
                navbar: tokens.components.navbar.height,
            },
        },
    },
    plugins: [],
}

