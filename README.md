# vite-plugin-externals

Use  external resources, like webpack externals

[![NPM version](https://img.shields.io/npm/v/@yellowspot/vite-plugin-externals.svg)](https://npmjs.org/package/@yellowspot/vite-plugin-externals)
[![NPM Downloads](https://img.shields.io/npm/dm/@yellowspot/vite-plugin-externals.svg)](https://npmjs.org/package/@yellowspot/vite-plugin-externals)

## Install

```bash
npm i @yellowspot/vite-plugin-externals -D
```

## Usage

```ts
import externals from '@yellowspot/vite-plugin-externals'

export default {
  plugins: [
    externals({
      jquery: `jQuery`,
    }),
  ]
}
```

## How it works

Let's use jQuery as an example

```js
externals({
  jquery: `window.jQuery`,
})
```

1. It creates `node_modules/.@yellowspot_vite-plugin-externals/jquery.cjs` containing the following code

```js
module.exports = window.jQuery;
```

2. It registers a `jquery` alias item adding it to `resolve.alias`

```js
{
  resolve: {
    alias: [
      {
        find: 'jquery',
        replacement: '/User/work-directory/node_modules/.@yellowspot_vite-plugin-externals/jquery.cjs',
      },
    ],
  },
}
```

## Motivation

While migrating a project from webpack to vite, we needed a way to mimic webpack's externals.
We found [vite-plugin-external](https://github.com/fengxinming/vite-plugins/tree/main/packages/vite-plugin-external) which does an excellent job. I couldn't use it because on build it relies on rollup global option which only works if the output format is umd / iife (see [docs here](https://rollupjs.org/configuration-options/#output-globals)).

We also tried [vite-plugin-resolve](https://github.com/vite-plugin/vite-plugin-resolve) without good results.

That's why we decided to write our own plugin on top of [vite-plugin-optimizer](https://github.com/vite-plugin/vite-plugin-optimizer)
