// __tests__/gendiff.test.js
import path from 'path';
import fs from 'fs';
import generateDiff from '../lib/gendiff.js';
import parseFile from '../lib/parsers.js';

const runTest = (file1, file2, expectedFile, format) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const expectedOutput = fs.readFileSync(expectedFile, 'utf-8').trim();
  const diff = generateDiff(data1, data2, format);
  expect(diff).toBe(expectedOutput);
};

test('genDiff JSON', () => {
  const json1 = path.resolve('fixtures/file1.json');
  const json2 = path.resolve('fixtures/file2.json');
  const expectedOutput = path.resolve('fixtures/expected_output.txt');
  runTest(json1, json2, expectedOutput, 'stylish');
});

test('genDiff YAML', () => {
  const yml1 = path.resolve('fixtures/file1.yml');
  const yml2 = path.resolve('fixtures/file2.yml');
  const expectedOutput = path.resolve('fixtures/expected_output.txt');
  runTest(yml1, yml2, expectedOutput, 'stylish');
});

test('genDiff JSON plain', () => {
  const json1 = path.resolve('fixtures/file1.json');
  const json2 = path.resolve('fixtures/file2.json');
  const expectedOutput = path.resolve('fixtures/expected_output_plain.txt');
  runTest(json1, json2, expectedOutput, 'plain');
});

test('genDiff YAML plain', () => {
  const yml1 = path.resolve('fixtures/file1.yml');
  const yml2 = path.resolve('fixtures/file2.yml');
  const expectedOutput = path.resolve('fixtures/expected_output_plain.txt');
  runTest(yml1, yml2, expectedOutput, 'plain');
});

test('genDiff JSON json', () => {
  const json1 = path.resolve('fixtures/file1.json');
  const json2 = path.resolve('fixtures/file2.json');
  const expectedOutput = path.resolve('fixtures/expected_output_json.json');
  runTest(json1, json2, expectedOutput, 'json');
});

test('genDiff YAML json', () => {
  const yml1 = path.resolve('fixtures/file1.yml');
  const yml2 = path.resolve('fixtures/file2.yml');
  const expectedOutput = path.resolve('fixtures/expected_output_json.json');
  runTest(yml1, yml2, expectedOutput, 'json');
});
