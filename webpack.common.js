const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonPaths = require('./paths');
const path = require('path');

const manifest_config = require(`./manifest.config.js`);

module.exports = {
  entry: commonPaths.entryPath,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ['@babel/react'],
        },
      },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  serve: {
    content: commonPaths.entryPath,
    dev: {
      publicPath: commonPaths.outputPath,
    },
    open: true,
  },
  resolve: {
    modules: [process.env.NODE_PATH, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    alias: {
      images: path.resolve(
        __dirname,
        `${process.env.NODE_PATH}/assets/images/index.js`
      ),
      'redux-store': path.resolve(__dirname, `redux-store`),
      utils: path.resolve(__dirname, `utils`),
      services: path.resolve(__dirname, `services`),
      locales: path.resolve(__dirname, `locales`),
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      title: manifest_config.name,
      favicon: path.resolve(__dirname, `src/assets/images/icons/favicon.ico`),
      meta: {
        description: manifest_config.description,
        keywords: manifest_config.keywords,
        'theme-color': manifest_config.background_color,
      },
    }),
  ],
};
