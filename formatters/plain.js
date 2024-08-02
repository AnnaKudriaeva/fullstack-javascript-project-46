function formatValuePlain(value) {
  if (value && value.constructor === Object) {
    return '[complex value]';
  }
  if (value === null) {
    return 'null';
  }
  if (value instanceof String || Object.prototype.toString.call(value) === '[object String]') {
    return `'${value}'`;
  }
  return JSON.stringify(value);
}

function formatPlain(diff, path = '') {
  const lines = [];

  const sortedKeys = Object.keys(diff).sort();
  for (let i = 0; i < sortedKeys.length; i += 1) {
    const key = sortedKeys[i];
    const item = diff[key];
    const itemType = item.type;
    const currentPath = path ? `${path}.${key}` : key;

    switch (itemType) {
      case 'added': {
        const value = formatValuePlain(item.value);
        lines.push(`Property '${currentPath}' was added with value: ${value}`);
        break;
      }
      case 'removed': {
        lines.push(`Property '${currentPath}' was removed`);
        break;
      }
      case 'changed': {
        const oldValue = formatValuePlain(item.value[0]);
        const newValue = formatValuePlain(item.value[1]);
        lines.push(`Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`);
        break;
      }
      case 'nested': {
        const nestedLines = formatPlain(item.value, currentPath);
        for (let j = 0; j < nestedLines.length; j += 1) {
          lines.push(nestedLines[j]);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return lines;
}

export default formatPlain;
