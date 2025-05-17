import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

function resolvePath(path: string) {
  const currentDir = dirname(fileURLToPath(import.meta.url))

  return join(currentDir, path)
}

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    'nuxt-zod-i18n', // must be before i18n
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],
  experimental: {
    typedPages: true,
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'en-US': 'en',
      'ru-RU': 'ru',
    },
  },
  i18n: {
    langDir: 'locales',
    defaultLocale: 'ru',
    vueI18n: resolvePath('./i18n/vue-i18n.options.ts'),
    experimental: {
      autoImportTranslationFunctions: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  css: [resolvePath('./app/assets/css/main.css')],
  ui: {
    colorMode: true,
    fonts: true,
  },
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
      subsets: [
        'cyrillic-ext',
        'cyrillic',
        'latin-ext',
        'latin',
      ],
    },
    families: [
      {
        name: 'CirceRoundedWeb',
        provider: 'local',
      },
    ],
  },
  colorMode: {
    storageKey: 'color-mode',
  },
  icon: {
    customCollections: [
      { prefix: 'sushi', dir: resolvePath('./app/assets/icons') },
    ],
    clientBundle: {
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
    },
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
})
