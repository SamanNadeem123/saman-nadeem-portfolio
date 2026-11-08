/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { void: '#070810', navy: '#11142A', neon: '#7955FF', electric: '#00CFFF', soft: '#E9EAF4' },
    fontFamily: { display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'], sans: ['"Inter Variable"', 'system-ui', 'sans-serif'], mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'] },
  } },
  plugins: [],
}
