#!/bin/bash
git clone https://github.com/flutter/flutter.git -b stable --depth 1
export PATH="$PATH:`pwd`/flutter/bin"
flutter doctor
flutter build web --output=build/web

# Ensure dist directory exists and copy build output
mkdir -p dist
cp -r build/web/* dist/