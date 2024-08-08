#!/usr/bin/env node

import { Command } from 'commander';
import compareFiles from '../lib/compareFiles.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = compareFiles(filepath1, filepath2, options.format);
    console.log(diff);
  })
  .parse(process.argv);
