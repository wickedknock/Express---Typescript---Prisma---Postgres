
FROM node:18.17.1-alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it
COPY . .
EXPOSE 4000
ENV NODE_ENV=production
RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]
