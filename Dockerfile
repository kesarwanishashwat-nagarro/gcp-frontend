FROM node:8-alpine

COPY . .

RUN npm install

EXPOSE 4200
 
ENTRYPOINT [ "node", "index.js" ]