#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../lib/parsers.js';
import generateDiff from '../lib/gendiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    const diff = generateDiff(data1, data2, options.format);
    console.log(diff);
  });

program.parse(process.argv);
