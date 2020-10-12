const path = require('path');

function _externals() {
  let manifest = require('../package.json');
  let dependencies = manifest.devDependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}

const externals = _externals();

module.exports = {
  mode: 'production',
  entry: './src/main/index.ts',
  // devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals,
  target: 'node'
};
