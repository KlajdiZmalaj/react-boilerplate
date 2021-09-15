const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');

const { outputPath, jsFolder, entryPath, cssFolder } = require('./paths');

const manifest_config = require(`./manifest.config.js`);

module.exports = {
  mode: 'production',
  entry: {
    main: entryPath,
  },
  output: {
    filename: `${jsFolder}/[name].[chunkhash].js`,
    path: outputPath,
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'runtime',
      name: 'vendor',
      minChunks: Infinity,
    },
  },
  plugins: [
    // new AsyncChunkNames(),
    new NameAllModulesPlugin(),
    new WebpackPwaManifest(manifest_config),
    new MiniCssExtractPlugin({
      filename: `${cssFolder}/[name].[chunkhash].css`,
    }),
  ],
};
