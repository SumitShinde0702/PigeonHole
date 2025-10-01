const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const pigeonholeDir = path.join(__dirname, 'src', 'pigeonhole');
const files = getAllFiles(pigeonholeDir);

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Replace @/components, @/lib, @/hooks, @/pages, @/data, @/types, @/assets
  content = content.replace(/@\/(components|lib|hooks|pages|data|types|assets)/g, '@/pigeonhole/$1');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});

console.log('Done!');

