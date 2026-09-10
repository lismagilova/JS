const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/hw6.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[contenthash].js',
    assetModuleFilename: 'images/[name].[contenthash][ext]',
    clean: true,
    publicPath: 'auto'
  },
  resolve: {extensions: ['.tsx', '.ts', '.js']},
  module: {rules: [
    {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
    {test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
    {test: /\.(png|jpe?g|svg|webp)$/i, type: 'asset/resource'}
  ]},
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin({filename: 'style.[contenthash].css'})
  ],
  devServer: {port: 8080, hot: true, open: false}
};
