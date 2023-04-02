# Indexpie - change default export in all index.js files in your project just in second
![npm](https://img.shields.io/npm/v/indexpo) ![npm](https://img.shields.io/npm/dm/indexpo)

## Features

🏃‍♂️ Runs from command line

💪 Changes the content of all index.js files from

```
export { default } from './your-awesome-component-name';
```
to
```
import YourAwesomeComponentName from './your-awesome-component-name';

export default YourAwesomeComponentName;
```

### Problem

The problem is that when exporting a component or module using the default keyword, VSCode may not provide auto-completion for importing this component or module. This happens because the default keyword is used to export a default value, and VSCode may not understand that this value should be used as the name for import.

Sometimes you may not know or forget about it and create a lot of components with the wrong export. In this situation, an indexpay will come to your aid.

### Usage

```
npx indexpo [options]

Options: 
-rd, --root-dir <rootDir> the name of the root folder if it is different from src (default: src)
-h, --help                    display help for command
```

Example:

```
npx indexpo
```

Output:

```
Done ...your-project-name/src/components/pages/home/hero/index.js
Done ...your-project-name/src/components/pages/pricing/calculator/index.js
Done ...your-project-name/src/components/pages/pricing/hero/index.js
Done ...your-project-name/src/components//shared/button/index.js
Done ...your-project-name/src/components/shared/footer/index.js
Done ...your-project-name/src/components/shared/header/burger/index.js
Done ...your-project-name/src/components/shared//header/index.js

--

7 index.js files have been updated, thanks for using indexpo (─ ‿‿ ─)

--

```
