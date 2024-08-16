import parseFile from './parsersFile.js';
import generateDiff from './gendiff.js';

function compareFiles(filepath1, filepath2, format = 'stylish') {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  return generateDiff(data1, data2, format);
}

export default compareFiles;
