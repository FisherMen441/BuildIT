#!/bin/bash

# Stop on errors
set -e
set -x

cd frontend/BuildIT
case $1 in
    "-s")
    npm start
    ;;

    *)
    npm install -g expo-cli
    npm install
    npm start
    ;;
esac