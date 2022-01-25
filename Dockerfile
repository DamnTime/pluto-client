# 镜像版本
FROM node:12.16.2-alpine

# 设置时区
RUN apk --update add tzdata \
&& cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone \
&& apk del tzdata

# 创建 app 目录
RUN mkdir -p /home/plutoweb/client/public

# 设置工作目录
WORKDIR /home/plutoweb/client/public


COPY . /home/plutoweb/client/public

# 安装 npm 依赖（使用淘宝的镜像源）
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为 `RUN npm i`。
RUN npm install --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目录

ENV NODE_ENV production

# 暴露容器端口
EXPOSE 3000

# 启动 Node 应用
CMD npm start