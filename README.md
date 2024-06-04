# nuxt-module-chrome-devtools

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Chrome devtools integrated with the [Nuxt Devtools](https://github.com/nuxt/devtools).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Perview

![Kapture 2024-06-04 at 20.17.16](https://cdn.jsdelivr.net/gh/yuyinws/static@master/2024/06/upgit_20240604_1717506619.gif)

## Quick Setup

1. Add `nuxt-module-chrome-devtools` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-module-chrome-devtools

# Using yarn
yarn add --dev nuxt-module-chrome-devtools

# Using npm
npm install --save-dev nuxt-module-chrome-devtools
```

2. Add `nuxt-module-chrome-devtools` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-module-chrome-devtools'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with playground, with devtools client ui
npm run dev

# Develop with playground, with bundled client ui
npm run play:prod

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-module-chrome-devtools/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-module-chrome-devtools

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-module-chrome-devtools.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-module-chrome-devtools

[license-src]: https://img.shields.io/npm/l/nuxt-module-chrome-devtools.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-module-chrome-devtools

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
