# Base image
FROM node:16 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json và cài đặt dependencies
COPY package.json ./
RUN npm install

# Copy mã nguồn và build dự án
COPY . .
RUN npm run build

# Sử dụng image NGINX để phục vụ nội dung static
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port và start NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
    