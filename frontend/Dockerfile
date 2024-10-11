# Stage 1: Build the React application
FROM node:16-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Update the Nginx configuration file to listen on port 8080
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
