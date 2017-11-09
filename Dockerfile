FROM nginx

# install node LTS (8.9.x)
RUN apt-get -qq update
RUN apt-get -qq --assume-yes install gnupg curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get -qq --assume-yes install nodejs
RUN alias node=/usr/bin/nodejs
RUN alias npm=/usr/bin/npm

# declare variables
ARG BUILD_ENV=dev
ARG INSTALL_OPTIONS=--silent
ARG NGINX_DIR=/usr/share/nginx
ARG WORK_DIR=/usr/src/app

# install project dependencies
WORKDIR ${WORK_DIR}
COPY package*.json ./
RUN if [ "$BUILD_ENV" = "dev" ]; then export NODE_ENV=development; fi
RUN if [ "$BUILD_ENV" = "prod" ]; then export NODE_ENV=production; fi
RUN npm i ${INSTALL_OPTIONS}

# copy and build project
COPY . ./
RUN npm run build:${BUILD_ENV}

# link project to nginx
RUN rm -rf ${NGINX_DIR}/html
RUN ln -s ${WORK_DIR}/public ${NGINX_DIR}/html

EXPOSE 80
