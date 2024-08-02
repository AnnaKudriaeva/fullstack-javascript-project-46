// __tests__/gendiff.test.js
import path from 'path';
import fs from 'fs';
import generateDiff from '../lib/gendiff.js';
import parseFile from '../lib/parsers.js';

test('genDiff JSON', () => {
  const json1 = path.resolve('fixtures/file1.json');
  const json2 = path.resolve('fixtures/file2.json');
  const data1 = parseFile(json1);
  const data2 = parseFile(json2);
  const expectedOutput = fs.readFileSync(path.resolve('fixtures/expected_output.txt'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'stylish');
  expect(diff).toBe(expectedOutput);
});

test('genDiff YAML', () => {
  const yml1 = path.resolve('fixtures/file1.yml');
  const yml2 = path.resolve('fixtures/file2.yml');
  const data1 = parseFile(yml1);
  const data2 = parseFile(yml2);
  const expectedOutput = fs.readFileSync(path.resolve('fixtures/expected_output.txt'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'stylish');
  expect(diff).toBe(expectedOutput);
});

test('genDiff JSON plain', () => {
  const json1 = path.resolve('fixtures/file1.json');
  const json2 = path.resolve('fixtures/file2.json');
  const data1 = parseFile(json1);
  const data2 = parseFile(json2);
  const expectedOutput = fs.readFileSync(path.resolve('fixtures/expected_output_plain.txt'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'plain');
  expect(diff).toBe(expectedOutput);
});

test('genDiff YAML plain', () => {
  const yml1 = path.resolve('fixtures/file1.yml');
  const yml2 = path.resolve('fixtures/file2.yml');
  const data1 = parseFile(yml1);
  const data2 = parseFile(yml2);
  const expectedOutput = fs.readFileSync(path.resolve('fixtures/expected_output_plain.txt'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'plain');
  expect(diff).toBe(expectedOutput);
});

test('genDiff JSON json', () => {
  const json1 = path.resolve('fixtures/file1.json');
  const json2 = path.resolve('fixtures/file2.json');
  const data1 = parseFile(json1);
  const data2 = parseFile(json2);
  const expectedOutput = fs.readFileSync(path.resolve('fixtures/expected_output_json.json'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'json');
  expect(diff).toBe(expectedOutput);
});

test('genDiff YAML json', () => {
  const yml1 = path.resolve('fixtures/file1.yml');
  const yml2 = path.resolve('fixtures/file2.yml');
  const data1 = parseFile(yml1);
  const data2 = parseFile(yml2);
  const expectedOutput = fs.readFileSync(path.resolve('fixtures/expected_output_json.json'), 'utf-8').trim();
  const diff = generateDiff(data1, data2, 'json');
  expect(diff).toBe(expectedOutput);
});
