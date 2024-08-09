function formatValue(value, depth, indentSize = 4) {
  const nestedCurrentIndent = ' '.repeat((depth + 1) * indentSize);
  const nestedNestedIndent = ' '.repeat((depth + 2) * indentSize);

  if (value && value.constructor === Object) {
    const formattedItems = Object.entries(value).map(
      ([k, v]) => `${nestedNestedIndent}${k}: ${formatValue(v, depth + 1, indentSize)}`,
    );
    const formattedItemsStr = formattedItems.join('\n');
    return `{\n${formattedItemsStr}\n${nestedCurrentIndent}}`;
  }
  if (value === null) {
    return 'null';
  }
  if (value === true || value === false) {
    return value.toString().toLowerCase();
  }
  return value.toString();
}

function formatItem(key, item, currentIndent, depth, formatStylishFn) {
  const itemType = item.type;

  if (itemType === 'unchanged') {
    return `${currentIndent}    ${key}: ${formatValue(item.value, depth)}`;
  }
  if (itemType === 'added') {
    return `${currentIndent}  + ${key}: ${formatValue(item.value, depth)}`;
  }
  if (itemType === 'removed') {
    return `${currentIndent}  - ${key}: ${formatValue(item.value, depth)}`;
  }
  if (itemType === 'changed') {
    const [oldValue, newValue] = item.value;
    return [
      `${currentIndent}  - ${key}: ${formatValue(oldValue, depth)}`,
      `${currentIndent}  + ${key}: ${formatValue(newValue, depth)}`,
    ].join('\n');
  }
  if (itemType === 'nested') {
    return `${currentIndent}    ${key}: ${formatStylishFn(item.value, depth + 1)}`;
  }
  throw new Error(`Unknown item type: ${itemType}`);
}

function formatStylish(diff, depth = 0) {
  const currentIndent = ' '.repeat(depth * 4);

  const keys = Object.keys(diff);

  const lines = (function formatSortedKeys(unsortedKeys) {
    if (unsortedKeys.length === 0) return '';

    const minKey = unsortedKeys.reduce((a, b) => (a < b ? a : b));
    const remainingKeys = unsortedKeys.filter((key) => key !== minKey);

    const formattedLine = formatItem(minKey, diff[minKey], currentIndent, depth, formatStylish);
    const restFormatted = formatSortedKeys(remainingKeys);

    return restFormatted ? `${formattedLine}\n${restFormatted}` : formattedLine;
  }(keys));

  return `{\n${lines}\n${currentIndent}}`;
}

export default formatStylish;
