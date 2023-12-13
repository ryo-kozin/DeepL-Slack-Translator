FROM node:18.19.0
WORKDIR ./app
COPY ./ ./app
RUN npm i @rollup/rollup-linux-arm64-gnu
RUN npm i

CMD ["npm", "run", "dev"]
