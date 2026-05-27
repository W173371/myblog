const { execSync } = require('child_process');
const fs = require('fs');

const url = 'https://github.com/sass/dart-sass/releases/download/1.86.0/dart-sass-1.86.0-linux-x64.tar.gz';

try {
  // 下载并解压到 /opt/
  execSync(`curl -fsSL ${url} -o /tmp/dart-sass.tar.gz`, { stdio: 'inherit' });
  execSync('tar -xzf /tmp/dart-sass.tar.gz -C /opt', { stdio: 'inherit' });
  
  // 创建从 /usr/local/bin/sass 到完整路径的符号链接
  fs.symlinkSync('/opt/dart-sass/sass', '/usr/local/bin/sass');
  
  const version = execSync('sass --version', { encoding: 'utf-8' });
  console.log('Dart Sass installed:', version.trim());
} catch (e) {
  console.error('Failed to install Dart Sass:', e.message);
  process.exit(1);
}
