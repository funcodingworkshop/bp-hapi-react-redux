const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  entry: './src/server/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '.build')
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/server/plugins/pages/index.hbs',
        toType: 'file'
      }
    ], { debug: 'info' })
  ],
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  module: {
    // exprContextCritical: false,
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
          'style-loader', // creates style nodes from JS strings
          { loader: 'css-loader', options: { importLoaders: 1 } }, // translates CSS into CommonJS
          'postcss-loader' // post CSS transform
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
