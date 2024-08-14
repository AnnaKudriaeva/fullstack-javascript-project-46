// __tests__/gendiff.test.js
import path from 'path';
import fs from 'fs';
import generateDiff from '../lib/gendiff.js';
import parseFile from '../lib/parser.js';

const runTest = (file1, file2, expectedFile, format) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const expectedOutput = fs.readFileSync(expectedFile, 'utf-8').trim();
  const diff = generateDiff(data1, data2, format);
  expect(diff).toBe(expectedOutput);
};

const testCases = [
  {
    name: 'JSON stylish',
    file1: 'fixtures/file1.json',
    file2: 'fixtures/file2.json',
    expectedOutput: 'fixtures/expected_output.txt',
    format: 'stylish',
  },
  {
    name: 'YAML stylish',
    file1: 'fixtures/file1.yml',
    file2: 'fixtures/file2.yml',
    expectedOutput: 'fixtures/expected_output.txt',
    format: 'stylish',
  },
  {
    name: 'JSON plain',
    file1: 'fixtures/file1.json',
    file2: 'fixtures/file2.json',
    expectedOutput: 'fixtures/expected_output_plain.txt',
    format: 'plain',
  },
  {
    name: 'YAML plain',
    file1: 'fixtures/file1.yml',
    file2: 'fixtures/file2.yml',
    expectedOutput: 'fixtures/expected_output_plain.txt',
    format: 'plain',
  },
  {
    name: 'JSON json',
    file1: 'fixtures/file1.json',
    file2: 'fixtures/file2.json',
    expectedOutput: 'fixtures/expected_output_json.json',
    format: 'json',
  },
  {
    name: 'YAML json',
    file1: 'fixtures/file1.yml',
    file2: 'fixtures/file2.yml',
    expectedOutput: 'fixtures/expected_output_json.json',
    format: 'json',
  },
];

testCases.forEach(({
  name, file1, file2, expectedOutput, format,
}) => {
  test(`genDiff ${name}`, () => {
    runTest(
      path.resolve(file1),
      path.resolve(file2),
      path.resolve(expectedOutput),
      format,
    );
  });
});
