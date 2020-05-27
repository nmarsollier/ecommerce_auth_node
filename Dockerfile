# Docker para desarrollo
FROM node:14.3.0

ENV MONGO_URL mongodb://host.docker.internal/authentication
ENV RABBIT_URL amqp://host.docker.internal

WORKDIR /app

# Puerto auth service
EXPOSE 3000

CMD npm install && npm start
