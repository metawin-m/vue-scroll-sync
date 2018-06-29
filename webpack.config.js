// from https://vuejsdevelopers.com/2017/07/31/vue-component-publish-npm/

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var config = {
    mode: 'production',
    output: {
      path: path.resolve(__dirname + '/dist/'),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /(node_modules|.storybook|stories|docs)/
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|.storybook|stories|docs)/
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap : false,
          uglifyOptions: {
            minimize : true,
            mangle: true,
            compress: {
              warnings: false
            }
          }
        })
      ]
    },
    externals: {
      vue: 'vue'
    }
}

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
        filename: 'scroll-sync.min.js',
        libraryTarget: 'window',
        library: 'ScrollSync',
        },
        target: 'web'
    }),
    merge(config, {
        entry: path.resolve(__dirname + '/src/ScrollSync.vue'),
        output: {
        filename: 'scroll-sync.js',
        libraryTarget: 'umd',
        library: 'vue-scroll-sync',
        umdNamedDefine: true
        },
        target: 'node'
    })
]
