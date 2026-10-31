import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        fabriq: {
          forest: '#0F4238',
          cream: '#FAF7F1',
          sand: '#E6DFCF',
          olive: '#5A635C',
          charcoal: '#171A17',
          warm: '#C67952',
          danger: '#D96060',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
