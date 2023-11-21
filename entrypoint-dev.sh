#!/bin/sh

prisma generate --schema=prisma/schema.prisma 

npm run start:dev

exec "$@"