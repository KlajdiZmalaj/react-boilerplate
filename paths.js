const path = require('path');

module.exports = {
  root: path.resolve(__dirname),
  outputPath: path.resolve(__dirname, `build`),
  entryPath: path.resolve(__dirname, `${process.env.NODE_PATH}/Root.jsx`),
  templatePath: path.resolve(__dirname, 'template.html'),
  imagesFolder: 'assets/images',
  fontsFolder: 'assets/fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
