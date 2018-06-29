// from https://vuejsdevelopers.com/2017/07/31/vue-component-publish-npm/

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
    output: {
      path: path.resolve(__dirname + '/dist/'),
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: __dirname,
          exclude: /(node_modules|.storybook|stories)/
        },
        {
          test: /\.vue$/,
          loader: 'vue'
        },
        {
          test: /\.css$/,
          loader: 'style!less!css'
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin( {
        minimize : true,
        sourceMap : false,
        mangle: true,
        compress: {
          warnings: false
        }
      } )
    ]
};

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
        filename: 'scroll-sync.min.js',
        libraryTarget: 'window',
        library: 'ScrollSync',
        }
    }),
    merge(config, {
        entry: path.resolve(__dirname + '/src/ScrollSync.vue'),
        output: {
        filename: 'scroll-sync.js',
        libraryTarget: 'umd',
        library: 'vue-scroll-sync',
        umdNamedDefine: true
        }
    })
];
