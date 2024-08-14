import { readFile } from './fileReader.js';
import parseData from './parser.js';

// Функция для чтения и парсинга файла
function parseFile(filepath) {
  const content = readFile(filepath); // Читаем содержимое файла
  return parseData(content); // Парсим данные без указания формата
}

export default parseFile;
