#!/bin/bash
codeDir=$(pwd)
if [ ! "${CID_WORKSPACE}" = "" ]; then
    echo CID_WORKSPACE:${CID_WORKSPACE}
    codeDir="${CID_WORKSPACE}/packages/frontend"
fi

cd $codeDir

echo '[INFO] update submodule'
git submodule update --init --recursive
git submodule update --remote

npm run obtainDocTime

npm config list

echo '[INFO] start installing dependency'

npm config set CYPRESS_INSTALL_BINARY 0

npm install --unsafe-perm=true --allow-root --verbose

if [ $? -ne 0 ];then
    echo "[ERROR] install dependencies falid!"
    exit 1
fi
echo '[INFO] dependencies installed'

echo '[INFO] start building'

if [ ${dynamicEnv} == "OpenTiny" ] && [ ${staticEnv} == "alpha-open" ]
then
    echo "come in alpha-open"
    npm run build:alpha-open
elif [ ${dynamicEnv} == "OpenTiny" ] && [ ${staticEnv} == "open" ]
then
    echo "come in open"
    npm run build:open
elif [ ${staticEnv} == "alpha" ]
then
    echo "come in alpha"
    npm run build:alpha
else
    echo "come in prod"
    npm run build:prod
fi

if [ $? -ne 0 ];then
    echo "[ERROR] build falid!"
    exit 1
fi
echo '[INFO] build completed'