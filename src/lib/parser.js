import yaml from 'js-yaml';

function yamlParser(content) {
  try {
    return yaml.load(content);
  } catch (e) {
    throw new Error('Invalid YAML format');
  }
}

function jsonParser(content) {
  try {
    return JSON.parse(content);
  } catch (e) {
    throw new Error('Invalid JSON format');
  }
}

export { yamlParser, jsonParser };
