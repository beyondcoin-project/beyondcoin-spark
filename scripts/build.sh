#!/bin/bash
set -xeo pipefail

mkdir -p dist
rm -rf dist/*

# Build server-side code
babel -d dist --ignore src/transport/granax-dep/node_modules src

# Copy granax-dep (on-demand installation for Tor)
cp src/transport/granax-dep/{package,npm-shrinkwrap}.json dist/transport/granax-dep/

# Build client-side www assets
(cd client && DEST=../dist/www npm run dist)

# Package to beyondcoin-spark-[x.y.z]-npm.tgz
if [[ "$1" == "--pack-tgz" ]]; then
  rm -f beyondcoin-spark-*-npm.tgz
  packpath=`npm pack`
  mv $packpath ${packpath/.tgz/-npm.tgz}
fi
