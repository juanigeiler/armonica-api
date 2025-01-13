FROM node:18
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon
EXPOSE 8000
CMD ["nodemon", "src/app.js"]