const resolve = require('path').resolve;

module.exports = {
  mode: 'development',
  entry: {
     app: [
      './app/src/dbhelper.js',
      './app/src/main.js'
     ],
     restaurant: [
      './app/src/dbhelper.js',
      './app/src/restaurant_info.js'
     ]
  },
  output: {
    path: resolve('./'),
    filename: './dist/[name].bundle.js'
  },
  devtool: 'inline-source-map',
   devServer: {
     contentBase: './app'
   },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
      }
    ]
  }
};
