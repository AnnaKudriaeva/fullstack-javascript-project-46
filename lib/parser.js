import fs from 'fs';
import yaml from 'js-yaml';

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf8');
}

function parseJSON(content) {
  return JSON.parse(content);
}

function parseYAML(content) {
  return yaml.load(content);
}

function parseData(content) {
  try {
    return parseJSON(content);
  } catch (jsonError) {
    try {
      return parseYAML(content);
    } catch (yamlError) {
      throw new Error('Unsupported data format');
    }
  }
}

function parseFile(filepath) {
  const content = readFile(filepath);
  return parseData(content);
}

export default parseFile;
