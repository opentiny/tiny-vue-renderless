#!/bin/bash
if [ ! $version ];
then npm version 0.1.0-`date "+%Y%m%d%H%M%S"`; 
else npm version $version; 
fi

npm install 
npm run build
npm run release

if [ $? -ne 0 ]
then
    echo "[ERROR] build falid!"
    exit 1
fi
echo '[INFO] build completed'

