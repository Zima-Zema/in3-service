FROM node:8.11.2
WORKDIR /var/code/
COPY . /var/code/
RUN npm install --production
ENTRYPOINT npm start
