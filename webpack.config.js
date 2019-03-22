module.exports = {
  entry: {
     app: [
      './src/dbhelper.js',
      './src/main.js'
     ],
     restaurant: [
      './src/dbhelper.js',
      './src/restaurant_info.js'
     ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].bundle.js'
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
