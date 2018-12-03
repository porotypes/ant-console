# FROM nginx

# #RUN rm -rf /usr/share/nginx/html
# COPY ./dist/ant-web-console/ /usr/share/nginx/html/

FROM nginx
COPY ./dist/ant-web-console/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]