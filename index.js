#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .name('indexpie')
  .description('cli to change default export in all index.js files')
  .description('enter the name of the root folder if it is different from src <rootDir>')
  .option(
    '-rd, --root-dir <rootDir>',
    'add the name of the root folder if it is different from src (default: src)', 
    'src')
  .action((option) => {
    const { rootDir } = option;
    const root = path.join(process.cwd(), rootDir);
    let counter = 0;

    function replaceExportDefault(filePath) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Find the file name

      const regex = /\.\/(.+?)['"]/;
      const matches = fileContent.match(regex);

      if (matches) {
        const fileName = matches[1];

        // Change file name from kebab case to camel case

        function toCamelCase(str) {
          const regex = /-(.)/g;
          const camelCase = str.replace(regex, (_, letter) => letter.toUpperCase());
          return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
        }

        const fileNameCamelCase = toCamelCase(fileName);
        const replacedContent = `import ${fileNameCamelCase} from './${fileName}';\n\nexport default ${fileNameCamelCase};\n`;

        fs.writeFileSync(filePath, replacedContent);
        counter++
        console.log('Done', filePath);
      } else {
        console.error('Filename not found in', filePath);
      }
    }

    // Recursively go through all the folders in the root folder

    function processIndexFiles(dir) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          processIndexFiles(filePath);
        } else if (file === 'index.js') {
          replaceExportDefault(filePath);
        }
      });
    }

    processIndexFiles(root);
    console.log(`\n--\n\n${counter} index.js files have been updated, thanks for using indexpo (─ ‿‿ ─)\n\n--\n`);
  });

program.parse();
