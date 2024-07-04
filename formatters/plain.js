function formatPlain(diff, path = "") {
    const lines = [];

    const sortedKeys = Object.keys(diff).sort();
    sortedKeys.forEach(key => {
        const item = diff[key];
        const itemType = item.type;
        const currentPath = path ? `${path}.${key}` : key;

        if (itemType === "added") {
            const value = formatValuePlain(item.value);
            lines.push(`Property '${currentPath}' was added with value: ${value}`);
        } else if (itemType === "removed") {
            lines.push(`Property '${currentPath}' was removed`);
        } else if (itemType === "changed") {
            const oldValue = formatValuePlain(item.value[0]);
            const newValue = formatValuePlain(item.value[1]);
            lines.push(`Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`);
        } else if (itemType === "nested") {
            lines.push(...formatPlain(item.value, currentPath));
        }
    });

    return lines;
}

function formatValuePlain(value) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return "[complex value]";
    } else if (value === null) {
        return "null";
    } else if (typeof value === "string") {
        return `'${value}'`;
    } else {
        return JSON.stringify(value);
    }
}

module.exports = formatPlain;