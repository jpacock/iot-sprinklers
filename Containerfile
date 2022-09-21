FROM node:14.19-alpine

RUN apk add --no-cache python3 py3-pip make g++

# shared library 
WORKDIR /app/shared
COPY packages/shared .
RUN yarn install

# client
WORKDIR /app/client
COPY packages/client .
RUN yarn install

EXPOSE 8080

CMD ["yarn", "start"]