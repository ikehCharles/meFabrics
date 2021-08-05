const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './lib/components/index.js'],
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: "/node_modules/", use: 'babel-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};