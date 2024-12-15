# Sử dụng Node.js image chính thức để build ứng dụng
FROM node:20 AS builder

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng Nginx để phục vụ ứng dụng React
FROM nginx:1.21

# Sao chép file build của React từ bước trước vào Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
