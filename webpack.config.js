const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development',
  entry: {
    index: './lib/es6/src/Dominant.bs.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dominant'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
};
