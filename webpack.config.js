const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

module.exports = {
  entry: path.resolve( 'src', 'index.js' ),
  output: {
    path: path.resolve( 'dist' ),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [ {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [ path.resolve( 'node_modules' ) ]
    }, {
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
    } ]
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: path.resolve( 'src', 'index.html' )
    } ),
    new MiniCssExtractPlugin()
  ]
}
