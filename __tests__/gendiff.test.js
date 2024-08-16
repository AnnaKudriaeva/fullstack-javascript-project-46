import path from 'path';
import fs from 'fs';
import generateDiff from '../src/lib/gendiff.js';
import parseData from '../src/lib/parsers.js';

// Функция для получения расширения файла
const getFileExtension = (filePath) => path.extname(filePath).substring(1);

// Функция для выполнения теста
const runTest = (file1, file2, expectedFile, format) => {
  const extension1 = getFileExtension(file1);
  const extension2 = getFileExtension(file2);

  const data1 = parseData(fs.readFileSync(file1, 'utf-8'), extension1);
  const data2 = parseData(fs.readFileSync(file2, 'utf-8'), extension2);
  const expectedOutput = fs.readFileSync(expectedFile, 'utf-8').trim();
  const diff = generateDiff(data1, data2, format);
  expect(diff).toBe(expectedOutput);
};

// Тесты
test('genDiff JSON stylish', () => {
  runTest(
    path.resolve('__fixtures__/file1.json'),
    path.resolve('__fixtures__/file2.json'),
    path.resolve('__fixtures__/expected_output.txt'),
    'stylish',
  );
});

test('genDiff YAML stylish', () => {
  runTest(
    path.resolve('__fixtures__/file1.yml'),
    path.resolve('__fixtures__/file2.yml'),
    path.resolve('__fixtures__/expected_output.txt'),
    'stylish',
  );
});

test('genDiff JSON plain', () => {
  runTest(
    path.resolve('__fixtures__/file1.json'),
    path.resolve('__fixtures__/file2.json'),
    path.resolve('__fixtures__/expected_output_plain.txt'),
    'plain',
  );
});

test('genDiff YAML plain', () => {
  runTest(
    path.resolve('__fixtures__/file1.yml'),
    path.resolve('__fixtures__/file2.yml'),
    path.resolve('__fixtures__/expected_output_plain.txt'),
    'plain',
  );
});

test('genDiff JSON json', () => {
  runTest(
    path.resolve('__fixtures__/file1.json'),
    path.resolve('__fixtures__/file2.json'),
    path.resolve('__fixtures__/expected_output_json.json'),
    'json',
  );
});

test('genDiff YAML json', () => {
  runTest(
    path.resolve('__fixtures__/file1.yml'),
    path.resolve('__fixtures__/file2.yml'),
    path.resolve('__fixtures__/expected_output_json.json'),
    'json',
  );
});
