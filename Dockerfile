FROM node:12

ARG CONFIGURATION

RUN npm install -g @angular/cli gzipper

WORKDIR /app
ADD . .

RUN npm i
RUN ng build --prod=true --aot=true --buildOptimizer=true --deleteOutputPath=true --progress=true --configuration=${CONFIGURATION:-test} && gzipper --gzip-level=6 ./dist

RUN npm cache clean --force

#FROM nginx:latest
#WORKDIR /usr/share/nginx/html
#
#COPY --from=0 /app/dist .
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf
