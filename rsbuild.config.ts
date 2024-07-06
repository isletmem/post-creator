import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    title: 'Post Creator',
    favicon: './public/favicon.svg',
    meta: {
      description: 'Post Creator for isletmem.app'
    }
  },
  plugins: [pluginReact()]
})
