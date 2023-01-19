FROM nginx:1.20-alpine

RUN apk add nano openssl
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./sentry_proxy.js /etc/nginx/sentry_proxy.js
ADD https://letsencrypt.org/certs/isrgrootx1.pem /etc/nginx/

EXPOSE 8000
EXPOSE 8089
