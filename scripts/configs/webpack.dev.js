const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: resolve('src/main.ts'),
  devtool: 'inline-source-map',
  output: {
    path: resolve('dist'),
    filename: 'bundle.dev.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/resources', to: 'resources', noErrorOnMissing: true },
        { from: 'src/configs', to: 'configs', noErrorOnMissing: true },
      ],
    }),
  ],
};
