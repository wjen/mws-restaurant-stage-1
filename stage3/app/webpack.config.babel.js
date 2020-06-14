const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
import imageminMozjpeg from 'imagemin-mozjpeg';
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
     app: './client/js/main.js',
     restaurant: './client/js/restaurant_info.js',
     serviceworker: './client/sw.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    compress: true,
    writeToDisk: true,
  },
   node: {
    net: 'empty',
    fs: 'empty'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'client/css'),
        to: path.resolve(__dirname, 'dist/css')
      },
      {
        from: path.resolve(__dirname, 'client/img'),
        to: path.resolve(__dirname, 'dist/img')
      },
    ]),
    // used to lower image size by lowering quality
    new ImageminPlugin({
      test: /\.(jpe?g|jpg|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 70,
          progressive: true
        })
      ]
    }),
    //webpack's version of dot.env
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['app', 'serviceworker'],
      template: __dirname + "/client/html/index.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['restaurant', 'serviceworker'],
      template: __dirname + "/client/html/restaurant.html",
      filename: 'restaurant.html'
    }),

  ],
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
           'file-loader',
         ],
      }
    ]
  }
};
