#!/bin/sh
set -e


wait-for-it -t 0 postgres:5432

npx prisma generate
npx prisma migrate deploy

npm run build
npm start
