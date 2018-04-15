import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  context: resolve(__dirname, './src'),
  devtool: 'source-map',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'VanillaBox',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'ts-loader', 'tslint-loader']
      },
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: { importLoaders: 2, minimize: true, module: false, sourceMap: true }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  }
}
