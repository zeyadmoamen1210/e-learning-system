# build stage
FROM node:14.21.3 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]