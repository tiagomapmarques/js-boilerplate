FROM nginx:1.15

# install node 10 LTS
RUN apt-get -qq update && apt-get -qq --assume-yes install gnupg curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get -qq --assume-yes install nodejs chromium libatk-adaptor gtk3.0
RUN alias node=/usr/bin/nodejs
RUN alias npm=/usr/bin/npm
RUN npm install yarn -g

# declare variables
ENV NGINX_DIR=/usr/share/nginx
ENV NGINX_CONF_DIR=/etc/nginx
ENV WORK_DIR=/usr/src/app
ENV BUILD_ENV=prod
ENV NODE_ENV=production
ENV INSTALL_OPTIONS=--silent

# configure and install dependencies
WORKDIR ${WORK_DIR}
COPY package.json ./
COPY yarn.lock ./
RUN export NODE_ENV=${NODE_ENV}
RUN yarn install ${INSTALL_OPTIONS}
COPY nginx.conf ${NGINX_CONF_DIR}

# copy and build project
COPY . ./
RUN yarn build:${BUILD_ENV}

# link project to nginx
RUN rm -rf ${NGINX_DIR}/html
RUN ln -s ${WORK_DIR}/public ${NGINX_DIR}/html

EXPOSE 80
