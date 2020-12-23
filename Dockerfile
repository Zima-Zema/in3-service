FROM node:8.11.2
WORKDIR /var/code/
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
CMD ["node", "index.js"]
ENTRYPOINT npm start
