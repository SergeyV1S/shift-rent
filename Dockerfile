FROM node:22.12.0-alpine AS builder

WORKDIR /var/www

ARG BASE_API_URL="${BASE_API_URL}"

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine AS production

COPY --from=builder /var/www/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV BASE_API_URL="${BASE_API_URL}"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]