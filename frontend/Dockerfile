FROM nginx:latest
COPY . /usr/share/nginx/html
RUN sed -i 's/index.html/landingpage.html/g' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]