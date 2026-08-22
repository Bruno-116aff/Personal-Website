import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--color-page)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-ink-muted)',
        subtle: 'var(--color-ink-subtle)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          strong: 'var(--color-accent-strong)',
          soft: 'var(--color-accent-soft)',
        },
        focus: 'var(--color-focus)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        container: 'var(--container-width)',
        prose: 'var(--prose-width)',
      },
      transitionDuration: {
        motion: 'var(--motion-duration)',
      },
    },
  },
  plugins: [],
} satisfies Config;
