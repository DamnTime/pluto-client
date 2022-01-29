# 删除源文件
rm -rf public;

# 解压 zip文件
unzip -o public.zip;

# 删除 zip文件
rm -f public.zip;

# 进入public目录
cd public;

# 关闭容器
docker-compose stop || true;

# 删除容器
docker-compose down || true;

# 构建镜像
docker-compose build;

# 启动并后台运行
docker-compose up -d;

# 对空间进行自动清理
docker system prune -a -f;