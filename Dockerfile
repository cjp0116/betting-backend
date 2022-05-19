FROM node:16.15
WORKDIR /usr/app
COPY . .
RUN npm install 
CMD npm run start