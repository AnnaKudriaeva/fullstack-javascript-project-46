// __tests__/gendiff.test.js
const path = require('path');
const fs = require('fs');
const { generateDiff } = require('../lib/gendiff'); // Adjusted to match the export in gendiff.js
const parseFile = require('../lib/parsers');

test('genDiff JSON', () => {
  const json1 = path.resolve('__tests__/file1.json');
  const json2 = path.resolve('__tests__/file2.json');
  const data1 = parseFile(json1);
  const data2 = parseFile(json2);
  const expectedOutput = fs.readFileSync(path.resolve('__tests__/expected_output.txt'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'stylish');
  expect(diff).toBe(expectedOutput);
});

test('genDiff YAML', () => {
  const yml1 = path.resolve('__tests__/file1.yml');
  const yml2 = path.resolve('__tests__/file2.yml');
  const data1 = parseFile(yml1);
  const data2 = parseFile(yml2);
  const expectedOutput = fs.readFileSync(path.resolve('__tests__/expected_output.txt'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'stylish'); 
  expect(diff).toBe(expectedOutput);
});
