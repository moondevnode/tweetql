# tweetql
GraphQL로 영화 API 만들기(nomadcoders graphql cource)


## node install
```bash
cd C:\MoonDev\withLang\inNode\nodeLearning\nomadcoders
mkdir tweetql
cd tweetql
npm init -y
npm i apollo-server graphql
npm i nodemon -D

touch server.js  # 실행되지 않을 경우: npm install -g touch-cli
touch .gitignore

> package.json
```
"scripts": {
  "dev": "nodemon server.js"
}

...,
"type": "module"
```

> server.js
```
import { ApolloServer, gql } from "apollo-server";
```

## test
```
npm run dev
```

