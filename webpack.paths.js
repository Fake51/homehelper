const path = require('path');

module.exports = {
  root: path.resolve(__dirname, './'),
  outputPath: path.resolve(__dirname, './', 'public'),
  entryPath: path.resolve(__dirname, './', 'src/js/index.js'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
