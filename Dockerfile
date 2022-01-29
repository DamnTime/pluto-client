# 镜像版本
FROM node:14.15.0-alpine

# 设置时区
RUN apk --update add tzdata \
&& cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone \
&& apk del tzdata

# 设置工作目录
WORKDIR /home/plutoweb/client/public

COPY . .

ENV NODE_ENV production

ENV HOST 0.0.0.0

# 暴露容器端口
EXPOSE 3000

# 安装 npm 依赖（使用淘宝的镜像源）
RUN npm install \
  --registry=https://registry.npm.taobao.org \
  --production=true

# 启动 Node 应用
CMD ["npm", "start"]