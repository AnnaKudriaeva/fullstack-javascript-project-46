import fs from 'fs';

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

export default readFile;
