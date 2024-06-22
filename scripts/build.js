const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

// Paths
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');
const srcIndexFile = path.join(srcDir, 'index.ts');
const distIndexFile = path.join(distDir, 'index.js');
const esmIndexFile = path.join(distDir, 'esm', 'index.js');

// Directories or files to ignore
const ignoreItems = [
  path.join(srcDir, 'tests'),
  // Add other items to ignore here
];

// Ensure dist directory exists
fs.ensureDirSync(distDir);

// Helper function to check if a path should be ignored
const shouldIgnore = (filePath) => {
  return ignoreItems.some((ignoreItem) => filePath.startsWith(ignoreItem));
};

// Copy non-TS/JSX files (like CSS), excluding ignored items
const copyNonTSFiles = (src, dest) => {
  fs.copySync(src, dest, {
    filter: (src) =>
      !shouldIgnore(src) && !src.endsWith('.tsx') && !src.endsWith('.ts'),
  });
};

copyNonTSFiles(srcDir, distDir);

// Transpile TSX and TS files, excluding ignored items
const transpileDirectory = (src, dest, envName) => {
  const filesToTranspile = [];

  const findFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      if (shouldIgnore(fullPath)) return;
      if (fs.statSync(fullPath).isDirectory()) {
        findFiles(fullPath);
      } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        filesToTranspile.push(fullPath);
      }
    });
  };

  findFiles(src);

  filesToTranspile.forEach((file) => {
    const relativePath = path.relative(src, file);
    const outFile = path.join(dest, relativePath).replace(/\.tsx?$/, '.js');
    const outDir = path.dirname(outFile);

    fs.ensureDirSync(outDir);
    execSync(`babel ${file} --out-file ${outFile} --env-name "${envName}"`);
  });
};

// Transpile src/ to dist/
transpileDirectory(srcDir, distDir, 'commonjs');

// Transpile src/index.ts to dist/index.js
execSync(
  `babel ${srcIndexFile} --out-file ${distIndexFile} --extensions ".ts" --env-name "commonjs"`,
);

// Generate TypeScript type declarations
execSync(`tsc --project tsconfig.json`);

// Create a module version of the output
transpileDirectory(srcDir, path.join(distDir, 'esm'), 'modules');
execSync(
  `babel ${srcIndexFile} --out-file ${esmIndexFile} --extensions ".ts" --env-name "modules"`,
);

// Correct paths in esm output
const correctEsmPaths = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      correctEsmPaths(fullPath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(
        /(from '\.\/)(components|lib|utils|index)(\/[^']+)/g,
        "from '../esm/$2$3",
      );
      fs.writeFileSync(fullPath, content);
    }
  });
};

correctEsmPaths(path.join(distDir, 'esm'));
