#!/bin/sh
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
exec "$@"