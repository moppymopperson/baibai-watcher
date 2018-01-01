FROM node:alpine
ADD . /baibai-watcher
WORKDIR /baibai-watcher
RUN npm install
CMD ["npm", "start"]
