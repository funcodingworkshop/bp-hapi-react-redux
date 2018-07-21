#!/bin/bash

appName=$1
appVersion=$2

if [ "$MODULE_VERSION" != "" ]
then
  appVersion=$MODULE_VERSION
fi

echo "Docker image version: $appVersion"

image="klishevich/$appName:$appVersion"

tar -cf build.tar .build node_modules

docker build -f ./Dockerfile -t $image .

docker push $image

rm build.tar
