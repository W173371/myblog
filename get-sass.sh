#!/bin/sh
set -e
curl -fsSL https://github.com/sass/dart-sass/releases/download/1.86.0/dart-sass-1.86.0-linux-x64.tar.gz -o /tmp/dart-sass.tar.gz
tar -xzf /tmp/dart-sass.tar.gz -C /tmp
cp /tmp/dart-sass/sass /usr/local/bin/sass
chmod +x /usr/local/bin/sass
echo "Dart Sass installed: $(sass --version)"
