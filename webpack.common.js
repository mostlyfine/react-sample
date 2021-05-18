const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  }
};

