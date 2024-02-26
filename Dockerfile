
FROM node:18.19.1-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma migrate dev
RUN npm run build
EXPOSE 4000

CMD ["npm", "start"]
