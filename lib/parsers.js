const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseFile(filepath) {
    const ext = path.extname(filepath);
    const content = fs.readFileSync(filepath, 'utf8');
    
    if (ext === '.json') {
        return JSON.parse(content);
    } else if (ext === '.yml' || ext === '.yaml') {
        return yaml.load(content);
    } else {
        throw new Error(`Unsupported file format: ${ext}`);
    }
}

module.exports = parseFile;
