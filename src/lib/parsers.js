import { yamlParser, jsonParser } from './parser.js';

function parseData(content, format) {
  const parsers = {
    json: jsonParser,
    yaml: yamlParser,
    yml: yamlParser,
  };

  const parser = parsers[format];

  if (!parser) {
    throw new Error(`Unsupported format: ${format}`);
  }

  return parser(content);
}

export default parseData;
