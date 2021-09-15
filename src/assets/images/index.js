let imagesObject = {};

try {
  imagesObject = {
    logo: require(`./logo.svg`).default,
  };
} catch (err) {
  console.error('error images', err);
}

export default imagesObject;
