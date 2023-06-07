const webpack = require('webpack')
const path = require('path')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        module: false,
        dgram: false,
        dns: false,
        fs: false,
        http2: false,
        net: false,
        tls: false,
        child_process: false,
        'mock-aws-s3': false,
        nock: false,
        constants: false,
        'aws-sdk': false,
        process: require.resolve('process/browser'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify')
      }

      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        fs: path.resolve(__dirname, 'src/fs.js') // Tạo một alias tới empty module cho fs
      }

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser'
        })
      )

      return webpackConfig
    }
  }
}
