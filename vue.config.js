// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  configureWebpack:{
    plugins: [
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      'assets': '@/assets',
      'common': '@/common',
      'components': '@/components',
      'network': '@/network',
      'views': '@/views',
      'baseComponents':'@/baseComponents',
      'utils':'@/utils',
      'hooks':'@/hooks'
    }
  }
}
}