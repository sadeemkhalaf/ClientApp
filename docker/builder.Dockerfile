FROM node:10-alpine
RUN apk update
RUN apk add --no-cache bash 
RUN apk add --no-cache rsync

WORKDIR /build

ADD docker/ci /ci
RUN apk add --no-cache make gcc g++ python

ADD package.json package-lock.json ./
# ADD docker/.npmrc /root/.npmrc
#--production --silent
RUN npm install 

WORKDIR /app

ENTRYPOINT ["/bin/bash", "/ci/npm-run.sh"]


