FROM node:12 as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run","start"]

FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app /usr/share/nginx/html
