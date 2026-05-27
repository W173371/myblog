const fs = require('fs');
const path = require('path');

const sassBin = path.join(__dirname, 'node_modules', '.bin', 'sass');
try {
  fs.chmodSync(sassBin, 0o755);
  console.log('sass permissions fixed');
} catch (e) {
  console.log('sass binary not found, skipping permission fix');
}
