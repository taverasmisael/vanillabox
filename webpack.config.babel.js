import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  context: resolve(__dirname, './src'),
  devtool: 'inline-source-map',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ],
  entry: './index.ts',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: ['ts-loader', 'tslint-loader'] },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2, minimize: true, module: false, sourceMap: true }
            },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ]
  }
}
