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
  function processKeys(keys) {
    if (keys.length === 0) {
      return [];
    }

    // Find the minimum key
    const minKey = keys.reduce((a, b) => (a < b ? a : b));
    const remainingKeys = keys.filter((key) => key !== minKey);

    // Process the minimum key
    const item = diff[minKey];
    const itemType = item.type;
    const currentPath = path ? `${path}.${minKey}` : minKey;

    const processedItem = (() => {
      switch (itemType) {
        case 'added': {
          const value = formatValuePlain(item.value);
          return [`Property '${currentPath}' was added with value: ${value}`];
        }
        case 'removed': {
          return [`Property '${currentPath}' was removed`];
        }
        case 'changed': {
          const oldValue = formatValuePlain(item.value[0]);
          const newValue = formatValuePlain(item.value[1]);
          return [`Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`];
        }
        case 'nested': {
          return formatPlain(item.value, currentPath);
        }
        default: {
          return [];
        }
      }
    })();

    // Concatenate the processed result with the rest
    return [...processedItem, ...processKeys(remainingKeys)];
  }

  const keys = Object.keys(diff);
  return processKeys(keys);
}

export default formatPlain;
