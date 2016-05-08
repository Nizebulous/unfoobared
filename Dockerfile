FROM python:2.7
MAINTAINER Damian Hites <nizebulous@gmail.com>

WORKDIR /site

ENV DJANGO_SETTINGS_MODULE unfoobared.settings
ENV NODE_ENV production

RUN apt-get update && \
    apt-get install -y ruby-full rubygems-integration nodejs npm && \
    ln -s /usr/bin/nodejs /usr/bin/node && \
    npm -g install browserify && \
    npm install && \
    gem install sass

# Copy and install requirements file
COPY requirements.txt /site/
RUN pip install -r requirements.txt

# Copy the whole site
COPY . /site/

EXPOSE 80
ENTRYPOINT ./prod_docker.sh
