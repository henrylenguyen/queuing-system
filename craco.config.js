const webpack = require('webpack')
const path = require('path')
module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          module: false,
          dgram: false,
          dns: false,
          fs: false,
          http2: false,
          net: false,
          tls: false,
          child_process: false,
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
          crypto: require.resolve('crypto-browserify'),
          path: require.resolve('path-browserify'),
          os: require.resolve('os-browserify/browser'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify')
        },
        alias: {
          fs: path.resolve(__dirname, 'src/fs.js') // Tạo một alias tới empty module cho fs
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser'
        })
      ]
    }
  }
}
