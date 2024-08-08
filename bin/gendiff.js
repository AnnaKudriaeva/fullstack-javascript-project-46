#!/usr/bin/env node

import { program } from 'commander';
//import compareFiles from '../lib/compareFiles.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish') // Дефолтный формат – 4 параметр
  .action((path1, path2) => { // Код вызова внутри action
    // Вывод на экран происходит здесь, а не внутри библиотеки

//    const diff = compareFiles(path1, path2, program.opts().format);
    console.log(path1, path2);
  })
  .parse(process.argv);
