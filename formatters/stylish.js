function formatValue(value, depth, indentSize = 4) {
    if (typeof value === 'object' && value !== null) {
        const formattedItems = [];
        const nestedCurrentIndent = ' '.repeat((depth + 1) * indentSize);
        const nestedNestedIndent = ' '.repeat((depth + 2) * indentSize);
        for (const [k, v] of Object.entries(value)) {
            formattedItems.push(
                `${nestedNestedIndent}${k}: ${formatValue(v, depth + 1, indentSize)}`
            );
        }
        const formattedItemsStr = formattedItems.join('\n');
        return `{\n${formattedItemsStr}\n${nestedCurrentIndent}}`;
    } else if (value === null) {
        return 'null';
    } else if (typeof value === 'boolean') {
        return value.toString().toLowerCase();
    } else {
        return value.toString();
    }
}

function formatItem(key, item, currentIndent, depth) {
    switch (item.type) {
        case 'unchanged':
            return `${currentIndent}    ${key}: ${formatValue(item.value, depth)}`;
        case 'added':
            return `${currentIndent}  + ${key}: ${formatValue(item.value, depth)}`;
        case 'removed':
            return `${currentIndent}  - ${key}: ${formatValue(item.value, depth)}`;
        case 'changed':
            const [oldValue, newValue] = item.value;
            return [
                `${currentIndent}  - ${key}: ${formatValue(oldValue, depth)}`,
                `${currentIndent}  + ${key}: ${formatValue(newValue, depth)}`,
            ].join('\n');
        case 'nested':
            return `${currentIndent}    ${key}: ${formatStylish(item.value, depth + 1)}`;
        default:
            throw new Error(`Unknown item type: ${item.type}`);
    }
}

function formatStylish(diff, depth = 0) {
    const currentIndent = ' '.repeat(depth * 4);
    const lines = Object.keys(diff)
        .sort()
        .map((key) => formatItem(key, diff[key], currentIndent, depth));

    const formattedLines = lines.join('\n');
    return `{\n${formattedLines}\n${currentIndent}}`;
}

module.exports = formatStylish;
