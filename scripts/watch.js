const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Paths
const srcDir = path.join(__dirname, '../src');
const ignoreDir = path.join(srcDir, 'test');

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

// Watch for changes
watcher.on('change', (filePath) => {
  console.log(`${filePath} has changed. Rebuilding...`);
  runBuild();
});

watcher.on('ready', () => {
  console.log('Watching for changes...');
});
