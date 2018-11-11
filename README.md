# WAVES
---
Guitar shop made with react and express.

### NOTE! 
  To  run this project you need to have installed
 - [yarn](https://yarnpkg.com/lang/en/), [npm](https://www.npmjs.com/get-npm)
 - [docker](https://www.docker.com/get-started)
 - [docker-compose](https://docs.docker.com/compose/install/)

### Run the project in development mode
1. (OPTIONAL) Run `docker-compose up -d` in root dir.
2. (OPTIONAL) Insert [moch data](https://github.com/Dmytro005/waves/tree/master/jsons) into MongoDB
3. Run `yarn install` both in root and ` ./client ` dir
4. Install `npm install concurrently prettier onchange -g`
5. `npm run dev`

### Commands

 - Run project in development mode: 
    - client
    - server(nodemon)
    - prettier(onchange)

    `npm run dev`

 - Host express API on `localhost:3002`. [DOCS](https://web.postman.co/collections/3368587-431df1dc-c590-45ec-8e0c-1feda2afa9a3?workspace=8358da19-19c9-45ba-8d76-2d6bc9d62598#ac67b370-4b7b-445e-b012-8eacde3027c3)

    `npm run start-server` 

 - Host react SPA on `localhost:3000`

    `npm run start-client`


