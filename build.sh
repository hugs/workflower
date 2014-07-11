#!/usr/bin/env bash
rm -rf ./bin/Workflower.app/

# For Node v11 
cd bin/node-webkit-v0.9.2-osx-ia32/

cp -R ./node-webkit.app ../Workflower.app
cd ../..
cp src/Info.plist bin/Workflower.app/Contents/Info.plist
cp src/img/workflower.icns bin/Workflower.app/Contents/Resources/nw.icns
cp -R src bin/Workflower.app/Contents/Resources/app.nw
find bin/Workflower.app/Contents/Resources/app.nw -name .DS_Store | xargs rm
find bin/Workflower.app/Contents/Resources/app.nw -not -name "*.node" -not -name "*.json" -type f -print0 | xargs -0 grep -l "hugs" | xargs rm
find bin/Workflower.app/Contents/Resources/app.nw -name ".git*" -print0 | xargs -0 rm -rf
./bin/Workflower.app/Contents/MacOS/node-webkit 
