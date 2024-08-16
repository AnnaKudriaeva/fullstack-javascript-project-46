import _ from 'lodash';
import { formatStylish, formatPlain, formatJson } from '../formatters/index.js';

function findDifferences(obj1, obj2) {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return _.reduce(keys, (acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const nestedDiff = findDifferences(value1, value2);
      acc[key] = { type: 'nested', value: nestedDiff };
      return acc;
    }

    if (!_.has(obj1, key)) {
      acc[key] = { type: 'added', value: value2 };
      return acc;
    }

    if (!_.has(obj2, key)) {
      acc[key] = { type: 'removed', value: value1 };
      return acc;
    }

    if (!_.isEqual(value1, value2)) {
      acc[key] = { type: 'changed', value: [value1, value2] };
      return acc;
    }

    acc[key] = { type: 'unchanged', value: value1 };
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

function generateDiff(data1, data2, formatName = 'stylish') {
  const diff = findDifferences(data1, data2);
  return formatDiff(diff, formatName);
}

export default generateDiff;
