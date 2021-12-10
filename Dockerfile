FROM node:14 AS builder 
WORKDIR /app
# ADD package.json /app/package.json
COPY . .
ENV APP_PORT=8080
ENV DB_PORT=3306
ENV JWT_SECRET_KEY=secretKey


ENV DB_NAME=dbmaster
ENV DB_HOST=ls-539e41793572116e6b776d35ec616dca81943964.cy0ilphxuzkd.ap-northeast-2.rds.amazonaws.com
ENV DB_USERNAME=dbmasteruser
ENV DB_PASSWORD=cookinglog123

ENV AWS_S3_BUCKET_NAME=cookinglog
ENV AWS_ACCESS_KEY_ID=AKIA2VXBQMY7J5OODZGS
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_REGION=ap-northeast-2
RUN npm install
RUN npm run build
ADD . /app
EXPOSE 8080


FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "start:prod"]