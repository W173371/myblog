const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const url = 'https://github.com/sass/dart-sass/releases/download/1.86.0/dart-sass-1.86.0-linux-x64.tar.gz';
const dest = '/usr/local/bin/sass';

try {
  execSync(`curl -fsSL ${url} -o /tmp/dart-sass.tar.gz`, { stdio: 'inherit' });
  execSync('tar -xzf /tmp/dart-sass.tar.gz -C /tmp', { stdio: 'inherit' });
  fs.copyFileSync('/tmp/dart-sass/sass', dest);
  fs.chmodSync(dest, 0o755);
  const version = execSync(`${dest} --version`, { encoding: 'utf-8' });
  console.log('Dart Sass installed:', version.trim());
} catch (e) {
  console.error('Failed to install Dart Sass:', e.message);
  process.exit(1);
}
