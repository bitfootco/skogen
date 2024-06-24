const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Paths
const srcDir = path.join(__dirname, '../src');
const ignoreDir = path.join(srcDir, 'test');

// Debounce delay in milliseconds
const debounceDelay = 300;

// Debounce timer
let debounceTimer;

// Watch options
const watcher = chokidar.watch(srcDir, {
  ignored: ignoreDir,
  persistent: true,
});

const runBuild = () => {
  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.error(`Build error: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
};

// Run the initial build
runBuild();

// Watch for changes with debouncing
watcher.on('change', (filePath) => {
  console.log(`${filePath} has changed. Rebuilding...`);

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    runBuild();
  }, debounceDelay);
});

watcher.on('ready', () => {
  console.log('Watching for changes...');
});
