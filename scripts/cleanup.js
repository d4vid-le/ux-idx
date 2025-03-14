const fs = require('fs');
const path = require('path');

const directoriesToClean = [
  '.next/cache',
  '.next/static',
  '.cursor',
  'node_modules/.cache'
];

function cleanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  console.log(`Cleaning ${dir}...`);
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      if (fs.lstatSync(filePath).isDirectory()) {
        cleanDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error(`Error cleaning ${filePath}:`, error);
    }
  }
}

// Clean all specified directories
directoriesToClean.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  cleanDirectory(fullPath);
});

console.log('Cleanup complete!'); 