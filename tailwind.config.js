/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a56db',
          dark: '#1e429f',
          darker: '#1a365d',
          light: '#e0f2fe',
          border: '#bfdbfe',
        },
        secondary: '#64748b',
        success: {
          DEFAULT: '#10b981',
          light: '#ecfdf5',
        },
        danger: {
          DEFAULT: '#ef4444',
          light: '#fee2e2',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fffbeb',
        },
        info: {
          DEFAULT: '#3b82f6',
          light: '#eff6ff',
        },
        light: '#f8fafc',
        dark: '#1e293b',
        gray: {
          DEFAULT: '#64748b',
          light: '#f1f5f9',
          medium: '#94a3b8',
          dark: '#475569',
        },
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
}