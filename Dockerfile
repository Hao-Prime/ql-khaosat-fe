
# RUN npm run build

FROM node:14.17.5-alpine
WORKDIR /app
COPY ./build ./build
RUN npm install -g serve
# start app
CMD serve -s build -p 3001
# Xóa cache nodemoduule mới chạy đc
# docker build -t haohi/qlks-fe-vnpt:0.1.7 .