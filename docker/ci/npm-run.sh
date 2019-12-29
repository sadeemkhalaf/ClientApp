#!/bin/bash

/bin/bash /ci/sync-folders.sh &
sleep 5
cd /build
npm install
npm run $1

