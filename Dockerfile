FROM node:14 AS builder 
WORKDIR /app
# ADD package.json /app/package.json
COPY . .
RUN npm install
RUN npm run build
ADD . /app
EXPOSE 8080


FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "start:prod"]