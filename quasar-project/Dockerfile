# Build stage
FROM node AS build

WORKDIR /app

# Copy Source Code
COPY . /app

# Install dependencies
RUN npm install

RUN npm install -g @quasar/cli

# Quasar build
RUN quasar build

# Runtime stage

FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/spa /usr/share/nginx/html

EXPOSE 80
