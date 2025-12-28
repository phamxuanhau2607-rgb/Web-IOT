// Design Tokens for Smart Home App
// Extracted from UI mockups in src/assets/UI/

export const tokens = {
    // Color Palette
    colors: {
        // Primary Colors
        primary: {
            main: '#007BFF',      // Primary Blue
            light: '#4DA3FF',
            dark: '#0056B3',
            50: '#E6F3FF',
            100: '#CCE7FF',
            500: '#007BFF',
            600: '#0056B3',
            700: '#004085',
        },

        // Secondary Colors
        secondary: {
            main: '#6C63FF',      // Purple accent
            light: '#8B84FF',
            dark: '#4D45CC',
        },

        // Accent Colors
        accent: {
            orange: '#FF6B35',
            green: '#00D084',
            yellow: '#FFC107',
            red: '#DC3545',
            pink: '#FF6B9D',
        },

        // Neutral/Grayscale
        neutral: {
            white: '#FFFFFF',
            50: '#F8F9FA',
            100: '#F4F7FA',        // Background Grey
            200: '#E9ECEF',
            300: '#DEE2E6',
            400: '#CED4DA',
            500: '#ADB5BD',
            600: '#6C757D',
            700: '#495057',
            800: '#333333',        // Text Dark
            900: '#212529',
            black: '#000000',
        },

        // Status Colors
        status: {
            success: '#28A745',
            warning: '#FFC107',
            error: '#DC3545',
            info: '#17A2B8',
        },

        // Background
        background: {
            primary: '#FFFFFF',
            secondary: '#F4F7FA',
            tertiary: '#F8F9FA',
        },

        // Text
        text: {
            primary: '#333333',
            secondary: '#6C757D',
            tertiary: '#ADB5BD',
            inverse: '#FFFFFF',
        },
    },

    // Typography
    typography: {
        fontFamily: {
            primary: "'Inter', system-ui, -apple-system, sans-serif",
            secondary: "'Inter', sans-serif",
        },
        fontSize: {
            xs: '0.75rem',      // 12px
            sm: '0.875rem',     // 14px
            base: '1rem',       // 16px
            lg: '1.125rem',     // 18px
            xl: '1.25rem',      // 20px
            '2xl': '1.5rem',    // 24px
            '3xl': '1.875rem',  // 30px
            '4xl': '2.25rem',   // 36px
            '5xl': '3rem',      // 48px
            '6xl': '3.75rem',   // 60px
        },
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.75,
        },
    },

    // Spacing (based on 4px grid)
    spacing: {
        0: '0',
        1: '0.25rem',    // 4px
        2: '0.5rem',     // 8px
        3: '0.75rem',    // 12px
        4: '1rem',       // 16px
        5: '1.25rem',    // 20px
        6: '1.5rem',     // 24px
        8: '2rem',       // 32px
        10: '2.5rem',    // 40px
        12: '3rem',      // 48px
        16: '4rem',      // 64px
        20: '5rem',      // 80px
        24: '6rem',      // 96px
        32: '8rem',      // 128px
    },

    // Border Radius
    borderRadius: {
        none: '0',
        sm: '0.25rem',   // 4px
        base: '0.5rem',  // 8px
        md: '0.75rem',   // 12px
        lg: '1rem',      // 16px
        xl: '1.5rem',    // 24px
        '2xl': '2rem',   // 32px
        full: '9999px',
    },

    // Shadows
    shadows: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },

    // Transitions
    transitions: {
        fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
        slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Z-Index  
    zIndex: {
        base: 0,
        dropdown: 100,
        sticky: 200,
        fixed: 300,
        modal: 400,
        popover: 500,
        tooltip: 600,
    },

    // Breakpoints (Desktop-first for laptop)
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    // Component-specific tokens
    components: {
        sidebar: {
            width: '280px',
            collapsedWidth: '80px',
        },
        navbar: {
            height: '64px',
        },
        card: {
            padding: '1.5rem',
            borderRadius: '1rem',
        },
        input: {
            height: {
                sm: '36px',
                base: '44px',
                lg: '52px',
            },
            borderRadius: '0.5rem',
        },
        button: {
            height: {
                sm: '36px',
                base: '44px',
                lg: '52px',
            },
            borderRadius: '0.5rem',
        },
    },
};

export default tokens;
