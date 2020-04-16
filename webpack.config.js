const resolve = require('path').resolve;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
     app: './app/src/main.js',
     restaurant: './app/src/restaurant_info.js',
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
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
        // query: {
        //   babelrc: false,
        //   presets: [["es2015", { modules: false }], "react", "stage-3"],
        // },
      },
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
