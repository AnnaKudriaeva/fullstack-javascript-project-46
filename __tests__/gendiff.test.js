import path from 'path';
import fs from 'fs';
import generateDiff from '../src/lib/gendiff.js';
import parseData from '../src/lib/parsers.js';

const getFileExtension = (filePath) => path.extname(filePath).substring(1);

const getFileData = (filePath) => {
  const extension = getFileExtension(filePath);
  return parseData(fs.readFileSync(filePath, 'utf-8'), extension);
};

const runDiffTest = (file1Path, file2Path, expectedFilePath, format) => {
  const file1 = getFileData(file1Path);
  const file2 = getFileData(file2Path);
  const expectedOutput = fs.readFileSync(expectedFilePath, 'utf-8').trim();
  const diff = generateDiff(file1, file2, format);
  expect(diff).toBe(expectedOutput);
};

// Тесты
test('genDiff JSON stylish', () => {
  runDiffTest(
    path.resolve('__fixtures__/file1.json'),
    path.resolve('__fixtures__/file2.json'),
    path.resolve('__fixtures__/expected_output.txt'),
    'stylish',
  );
});

test('genDiff YAML stylish', () => {
  runDiffTest(
    path.resolve('__fixtures__/file1.yml'),
    path.resolve('__fixtures__/file2.yml'),
    path.resolve('__fixtures__/expected_output.txt'),
    'stylish',
  );
});

test('genDiff JSON plain', () => {
  runDiffTest(
    path.resolve('__fixtures__/file1.json'),
    path.resolve('__fixtures__/file2.json'),
    path.resolve('__fixtures__/expected_output_plain.txt'),
    'plain',
  );
});

test('genDiff YAML plain', () => {
  runDiffTest(
    path.resolve('__fixtures__/file1.yml'),
    path.resolve('__fixtures__/file2.yml'),
    path.resolve('__fixtures__/expected_output_plain.txt'),
    'plain',
  );
});

test('genDiff JSON json', () => {
  runDiffTest(
    path.resolve('__fixtures__/file1.json'),
    path.resolve('__fixtures__/file2.json'),
    path.resolve('__fixtures__/expected_output_json.json'),
    'json',
  );
});

test('genDiff YAML json', () => {
  runDiffTest(
    path.resolve('__fixtures__/file1.yml'),
    path.resolve('__fixtures__/file2.yml'),
    path.resolve('__fixtures__/expected_output_json.json'),
    'json',
  );
});
