const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
import imageminMozjpeg from 'imagemin-mozjpeg';
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
     app: './app/src/main.js',
     restaurant: './app/src/restaurant_info.js',
     serviceworker: './app/sw.js'
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
    // hot: true,
   },
   node: {
    fs: 'empty'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'app/html'),
      },
      {
        from: path.resolve(__dirname, 'app/css'),
        to: path.resolve(__dirname, 'dist/css')
      },
      {
        from: path.resolve(__dirname, 'app/img'),
        to: path.resolve(__dirname, 'dist/img')
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|jpg|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 75,
          progressive: true
        })
      ]
    }),
    new Dotenv()
  ],
  module: {
    rules: [
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
