const images = require('./images.json');

exports.getImages = function () {
  return JSON.stringify(images);
}
