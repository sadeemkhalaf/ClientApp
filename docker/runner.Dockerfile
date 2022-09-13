# IMPORTANT NOTE nginx exposes port 80
# TODO pass build-arg as frontend env
FROM capellasolutions/ats-frontend:builder-latest
WORKDIR /build
ADD . .
RUN npm install
RUN npm run build:prod

FROM nginx:1.23.1
WORKDIR /usr/share/nginx/html
COPY --from=0 /build/dist .
COPY docker/nginx/*.conf /etc/nginx/conf.d/
