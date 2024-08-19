FROM nginxinc/nginx-unprivileged
RUN mkdir /etc/nginx/streams-conf.d

COPY nginx.conf /etc/nginx/nginx.conf
COPY stream_proxy.conf /etc/nginx/stream_proxy.conf
COPY internal_proxy.conf /etc/nginx/internal_proxy.conf
COPY metrics.conf /etc/nginx/metrics.conf
