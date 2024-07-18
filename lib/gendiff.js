import { formatStylish, formatPlain, formatJson } from '../formatters/index.js';

function findDifferences(data1, data2) {
  const diff = {};
  const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);

  keys.forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === value2) {
      diff[key] = { type: 'unchanged', value: value1 };
    } else if (!(key in data1)) {
      diff[key] = { type: 'added', value: value2 };
    } else if (!(key in data2)) {
      diff[key] = { type: 'removed', value: value1 };
    } else if (typeof value1 === 'object' && typeof value2 === 'object') {
      diff[key] = { type: 'nested', value: findDifferences(value1, value2) };
    } else {
      diff[key] = { type: 'changed', value: [value1, value2] };
    }
  });

  return diff;
}

function formatDiff(diff, formatName) {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff).join('\n');
    case 'json':
      return formatJson(diff);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
}

function generateDiff(data1, data2, format = 'stylish') {
  const diff = findDifferences(data1, data2);
  return formatDiff(diff, format);
}

export default generateDiff;
