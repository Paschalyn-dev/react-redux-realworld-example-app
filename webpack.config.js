module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              presets: ['es2015']
          },
          resolve: {
            extensions: ['.js', '.jsx']
        }
        }
      ]
    }
  }