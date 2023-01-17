FROM nginx:1.20-alpine
RUN apk add nano openssl
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./sentry_proxy.js /etc/nginx/sentry_proxy.js
COPY ./isrgrootx1.pem /etc/nginx/isrgrootx1.pem



EXPOSE 8000
