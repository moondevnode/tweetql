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
```

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

## Aplolo Server

> open browse
```chrome
http://localhost:4000/
```

> operation: run
```
{
  text
  hello
}
```

> response:
```
{
  "data": {
    "text": null,
    "hello": null
  }
}
```

## graphqls

### queries

{
  allTweets {
    id
    text
    author {
      lastName
      fullName
    }
  }
}

{
  tweet(id: "1") {
    id
    text
  }
}

{
  allUsers  {
    id
    userName
    lastName
    firstName
    fullName
  }
}

### mutations
mutation {
  postTweet(text: "I'm new", userId: "1") {
    id
    text
  }
}

mutation($text: String!, $userId: ID!) {
  postTweet(text: $text, userId: $userId) {
    text
    id
  }
}

mutation($deleteTweetId: ID!) {
  deleteTweet(id: $deleteTweetId)
}
