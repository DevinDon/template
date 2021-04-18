const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: resolve('src/main.ts'),
  // devtool: 'inline-source-map',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
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
  externals: Object.assign(
    {},
    { saslprep: 'require(\'saslprep\')' },
  ),
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/resources', to: 'resources', noErrorOnMissing: true },
        { from: 'rester.yaml' },
      ],
    }),
  ],
};
