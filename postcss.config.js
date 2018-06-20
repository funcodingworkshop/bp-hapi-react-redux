module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    autoprefixer: {
      browsers: [
        'last 2 versions',
        'ie >= 10',
        'Android >= 4',
        'iOS >= 9'
      ]
    }
  }
};
