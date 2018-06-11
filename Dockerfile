FROM node:8.11

WORKDIR /src
ADD build.tar .

CMD [  "node", "./.build/server/server" ]
