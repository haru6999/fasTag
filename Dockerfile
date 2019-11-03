FROM python:3.7

EXPOSE 5000

RUN apt-get install default-libmysqlclient-dev

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN pip3 install flask firebase-admin

COPY . .