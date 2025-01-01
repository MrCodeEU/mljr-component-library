import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // neo-brutalist colors (yellow for light, purple for dark)
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047', // light mode main
          400: '#facc15',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce', // dark mode main
          800: '#6b21a8',
          900: '#581c87'
        }
      }
    }
  },
  plugins: [typography, forms, containerQueries, flowbitePlugin]
} satisfies Config;
