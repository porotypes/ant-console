FROM nginx

RUN rm -rf /usr/share/nginx/html
COPY . /usr/share/nginx/html/
COPY ./nginxSimple.conf /etc/nginx/conf.d/default.conf

# FROM nginx
# COPY ./dist/ant-web-console/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]