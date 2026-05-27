#!/bin/bash
curl -L https://github.com/gohugoio/hugo/releases/download/v0.158.0/hugo_extended_0.158.0_linux-amd64.tar.gz -o /tmp/hugo.tar.gz
tar -xzf /tmp/hugo.tar.gz -C /tmp
cp /tmp/hugo /usr/local/bin/hugo
