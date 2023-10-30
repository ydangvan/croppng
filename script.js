const Jimp = require('jimp');

// Open the PNG image
Jimp.read('google-logo.png')
  .then(image => {
    // Convert the image to RGBA mode (if it's not already)
    image.rgba();

    // Create a mask by checking for non-transparent pixels
    const mask = new Jimp(image.getWidth(), image.getHeight(), 0); // Initialize the mask with all zeros

    // Loop through the image's alpha channel and set mask pixels to 255 for non-transparent pixels
    image.scan(0, 0, image.getWidth(), image.getHeight(), function (x, y, idx) {
      const alpha = this.bitmap.data[idx + 3];
      if (alpha > 0) {
        mask.setPixelColor(0xffffffff, x, y); // Set mask pixels to white (255)
      }
    });

    // Find bounding box of non-transparent region
    const bbox = mask.getBounds();

    // Crop the image to the bounding box
    image.crop(bbox.x, bbox.y, bbox.width, bbox.height);

    // Save the cropped image
    image.write('google-logo-cropped.png');
  })
  .catch(err => {
    console.error(err);
  });
