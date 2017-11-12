FROM nginx

# install node 8 LTS
RUN apt-get -qq update
RUN apt-get -qq --assume-yes install gnupg curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get -qq --assume-yes install nodejs
RUN alias node=/usr/bin/nodejs
RUN alias npm=/usr/bin/npm

# declare variables
ENV NGINX_DIR=/usr/share/nginx
ENV NGINX_CONF_DIR=/etc/nginx
ENV WORK_DIR=/usr/src/app
ENV BUILD_ENV=prod
ENV NODE_ENV=production
ENV INSTALL_OPTIONS=--silent

# configure and install dependencies
WORKDIR ${WORK_DIR}
COPY nginx.conf ${NGINX_CONF_DIR}
COPY package*.json ./
RUN export NODE_ENV=${NODE_ENV}
RUN npm i ${INSTALL_OPTIONS}

# copy and build project
COPY . ./
RUN npm run build:${BUILD_ENV}

# link project to nginx
RUN rm -rf ${NGINX_DIR}/html
RUN ln -s ${WORK_DIR}/public ${NGINX_DIR}/html

EXPOSE 80
