# Fitnest: Web Frontend

[![NextJS CI](https://github.com/fitnestcorp/frontend/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/fitnestcorp/frontend/actions/workflows/ci.yml)

This repo hosts all the files for the Fitnest online store made with [NextJS 14](https://nextjs.org/) and deployed to [Vercel](https://vercel.com/)

## Local Development

For local development, it's necessary to run the [backend and its dependencies](https://github.com/fitnestcorp/fitnest-api-backend) including the [PostgreSQL 16](https://www.postgresql.org/download/) DB.

You can then run the development server using:

``` bash
# install dependencies
npm install

# start dev server
npm run dev
```

which will create the NextJS dev server on port 4000 with hot reloading from source included!

## Production

This project was deployed to vercel for ease, however, any [node.js]() environment will suffice, even a Docker one.

``` bash
# install production dependencies
npm ci

# build the project
npm run build

# start production server
npm run start
```

## ROADMAP
- [ ] Recommendation algorithm based on user preferences
- [ ] Order management and tracking
- [ ] Chatbot for user support
- [ ] Multi-language availability
- [ ] Wish list
