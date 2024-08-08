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
  return Object.keys(diff)
    .sort()
    .flatMap((key) => {
      const item = diff[key];
      const itemType = item.type;
      const currentPath = path ? `${path}.${key}` : key;

      switch (itemType) {
        case 'added': {
          const value = formatValuePlain(item.value);
          return `Property '${currentPath}' was added with value: ${value}`;
        }
        case 'removed': {
          return `Property '${currentPath}' was removed`;
        }
        case 'changed': {
          const oldValue = formatValuePlain(item.value[0]);
          const newValue = formatValuePlain(item.value[1]);
          return `Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`;
        }
        case 'nested': {
          return formatPlain(item.value, currentPath);
        }
        default: {
          return [];
        }
      }
    });
}

export default formatPlain;
