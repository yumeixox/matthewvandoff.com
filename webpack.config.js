const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        options: {
          outputPath: 'fonts',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|mp3)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'components': path.resolve(__dirname, 'src/components')
    }
  },
  devServer: {
    contentBase: './dist',
    overlay: true,
    hot: true,
    clientLogLevel: 'silent',
    port: 3000,
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new CleanWebpackPlugin()
  ],
  devtool: 'eval-cheap-module-source-map',
};

module.exports = config;
