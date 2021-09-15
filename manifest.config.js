const path = require('path');

module.exports = {
  name: 'React Stare name',
  short_name: 'React Stare short_name',
  description: 'React Stare description',
  keywords: 'React Stare keywords',
  background_color: '#fff', //Transparent default
  icons: [
    {
      src: path.resolve(`src/assets/images/icons/favicon.ico`),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join(`assets`, 'icons'),
    },
    // {
    //   src: path.resolve('src/assets/large-icon.ico'),
    //   size: '1024x1024',
    // },
    // {
    //   src: path.resolve('src/assets/maskable-icon.ico'),
    //   size: '1024x1024',
    //   purpose: 'maskable',
    // },
  ],
};
