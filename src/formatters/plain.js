function formatValuePlain(value) {
  if (value && value.constructor === Object) {
    return '[complex value]';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return JSON.stringify(value);
}

function formatPlain(diff, path = '') {
  return Object.keys(diff).flatMap((key) => {
    const item = diff[key];
    const currentPath = path ? `${path}.${key}` : key;

    switch (item.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValuePlain(item.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValuePlain(item.value[0])} to ${formatValuePlain(item.value[1])}`;
      case 'nested':
        return formatPlain(item.value, currentPath);
      default:
        return [];
    }
  });
}

export default formatPlain;
