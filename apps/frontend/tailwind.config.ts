import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        'surface-muted': 'var(--bg-surface-hi)',
        'surface-hi': 'var(--bg-surface-hi)',
        ink: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        subtle: 'var(--text-tertiary)',
        border: 'var(--border-subtle)',
        'border-visible': 'var(--border-visible)',
        accent: {
          DEFAULT: 'var(--accent)',
          strong: 'var(--accent-text)',
          soft: 'var(--accent-soft)',
          control: 'var(--accent-control)',
          'control-hover': 'var(--accent-control-hover)',
        },
        metric: 'var(--metric)',
        focus: 'var(--accent-text)',
      },
      fontFamily: {
        display: ['Inter Tight', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        container: 'var(--max-w)',
        prose: 'var(--prose-width)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
      },
      transitionDuration: {
        motion: '150ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
