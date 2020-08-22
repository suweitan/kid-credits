/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    // compatible with @nuxtjs/color-mode
    darkSelector: '.dark-mode',
    extend: {
      colors: {
          "smoke-900": "rgba(0, 0, 0, 0.9)",
          "smoke-800": "rgba(0, 0, 0, 0.75)",
          "smoke-600": "rgba(0, 0, 0, 0.6)",
          smoke: "rgba(0, 0, 0, 0.5)",
          "smoke-400": "rgba(0, 0, 0, 0.4)",
          "smoke-200": "rgba(0, 0, 0, 0.25)",
          "smoke-100": "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  variants: {
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
      'hover'
    ],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('@tailwindcss/ui'),
  ], 
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
