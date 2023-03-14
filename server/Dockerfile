# syntax=docker/dockerfile:1
FROM node:alpine
ENV NODE_ENV=dev
ENV PORT=3000
ENV EXPIRES_IN='30d'
ENV ISSUER='http://localhost:3000'
ENV SECRET_KEY='secret'
ENV CONNECTIONSTRING='mongodb://mongo:27017/crudAlertDB'
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]