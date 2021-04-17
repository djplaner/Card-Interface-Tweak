const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/cards.js',
  },
//  plugins: [
//    new HtmlWebpackPlugin({
//      title: 'Card Interface Test',
//    }),
//  ],

  output: {
    filename: 'cards.js',
    path: path.resolve(__dirname, 'dist'),
    library : {
      name: 'guCardInterface',
      type: 'var',
    },
  },
};