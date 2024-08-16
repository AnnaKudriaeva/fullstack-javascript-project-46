import path from 'path';
import readFile from './fileReader.js';
import parseData from './parsers.js';

const getFileExtension = (filePath) => path.extname(filePath).slice(1);

function parseFile(filepath) {
  const content = readFile(filepath);
  const format = getFileExtension(filepath);
  return parseData(content, format);
}

export default parseFile;
