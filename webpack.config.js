const resolve = require('path').resolve;

module.exports = {
  mode: 'development',
  entry: {
     app: [
      './app/src/main.js'
     ],
     restaurant: [
      './app/src/restaurant_info.js'
     ],
     serviceworker: './app/sw.js'
  },
  output: {
    path: resolve(__dirname, "app"),
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
   devServer: {
    contentBase: resolve(__dirname, "app"),
    watchContentBase: true,
    compress: true,
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
