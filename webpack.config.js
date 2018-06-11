const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '.build/client')
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/client/assets',
        to: 'assets'
      }
    ], { debug: 'info' })
  ]
};
