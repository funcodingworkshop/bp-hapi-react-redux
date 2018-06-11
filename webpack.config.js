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
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  devServer: {
    port: 9090
  }
};
