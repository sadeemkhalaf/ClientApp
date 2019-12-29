#!/bin/bash
while :
do
	rsync -a /app/ /build/. --exclude node_modules --exclude .git --delete
	sleep 0.3
done