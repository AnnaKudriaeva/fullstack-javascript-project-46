import _ from 'lodash';
import { formatStylish, formatPlain, formatJson } from '../formatters/index.js';

function findDifferences(obj1, obj2, path = '') {
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  return _.reduce(keys, (acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const currentPath = path ? `${path}.${key}` : key;

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const nestedDiff = findDifferences(value1, value2, currentPath);
      if (!_.isEmpty(nestedDiff)) {
        acc[key] = { type: 'nested', value: nestedDiff };
      }
    }

    if (_.isEqual(value1, value2)) {
      acc[key] = { type: 'unchanged', value: value1 };
    }

    if (!_.has(obj1, key)) {
      acc[key] = { type: 'added', value: value2 };
    }

    if (!_.has(obj2, key)) {
      acc[key] = { type: 'removed', value: value1 };
    }

    if (!_.has(acc, key)) {
      acc[key] = { type: 'changed', value: [value1, value2] };
    }

    return acc;
  }, {});
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

function generateDiff(data1, data2, formatName) {
  const format = formatName !== undefined ? formatName : 'stylish';
  const diff = findDifferences(data1, data2);
  return formatDiff(diff, format);
}

export default generateDiff;
