#!/usr/bin/env bash
rm -rf ./bin/Workflower.app/

# For Node v11 
cd bin/node-webkit-v0.9.2-osx-ia32/

cp -R ./node-webkit.app ../Workflower.app
cd ../..
cp src/Info.plist bin/Workflower.app/Contents/Info.plist
cp src/img/workflower.icns bin/Workflower.app/Contents/Resources/nw.icns

./bin/Workflower.app/Contents/MacOS/node-webkit 
