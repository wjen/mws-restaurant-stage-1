const resolve = require('path').resolve;

module.exports = {
  mode: 'development',
  entry: {
     app: [
      './app/src/registration.js',
      './app/src/dbhelper.js',
      './app/src/main.js'
     ],
     restaurant: [
      './app/src/registration.js',
      './app/src/dbhelper.js',
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
    publicPath: '/assets/',
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
