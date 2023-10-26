FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 8080
CMD [ "node", "listen_deploys.js" ]
