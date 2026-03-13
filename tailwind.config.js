
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        'leafy-green': 'var(--leafy-green)',
        'sky-blue': 'var(--sky-blue)',
        'sunshine-yellow': 'var(--sunshine-yellow)',
        'cloud-white': 'var(--cloud-white)',
        'breezy-teal': 'var(--breezy-teal)',
        'sunset-orange': 'var(--sunset-orange)',
        'earth-brown': 'var(--earth-brown)',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        'blob-1': '60% 40% 55% 45% / 50% 60% 40% 50%',
        'blob-2': '40% 60% 45% 55% / 60% 50% 55% 45%',
        'blob-3': '55% 45% 60% 40% / 45% 55% 50% 60%',
        'blob-4': '45% 55% 40% 60% / 55% 45% 60% 40%',
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(141, 110, 99, 0.12)',
        'warm-lg': '0 10px 25px -5px rgba(141, 110, 99, 0.18)',
        'warm-inner': 'inset 0 2px 4px 0 rgba(141, 110, 99, 0.06)',
      },
      animation: {
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
