FROM nginx:1.20-alpine
RUN apk add nano openssl
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./sentry_proxy.js /etc/nginx/sentry_proxy.js
RUN wget https://letsencrypt.org/certs/isrgrootx1.pem -P /etc/nginx/



EXPOSE 8000
