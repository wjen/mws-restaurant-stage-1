const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');




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

  ],
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
           'file-loader',
         ],
      }
    ]
  }
};
