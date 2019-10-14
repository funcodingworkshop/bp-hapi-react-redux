const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  entry: './src/server/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '.build'),
    publicPath: 'assets/'
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/server/plugins/pages/index.hbs',
        to: ''
      }
    ])
  ],
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'react'],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
              'transform-runtime',
              'transform-async-to-generator'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          } // post CSS transform
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8080
  }
};
