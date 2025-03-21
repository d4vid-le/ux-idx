const https = require('https');
const fs = require('fs');
const path = require('path');

const MARKER_ICONS = {
  'marker-icon.png': 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  'marker-shadow.png': 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png'
};

const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

Object.entries(MARKER_ICONS).forEach(([filename, url]) => {
  const file = fs.createWriteStream(path.join(publicDir, filename));
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filename);
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 