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


## REST API -> Graphql API
### prerequisite
> install fetch
```
npm i node-fetch
```

> install json viewer(chrome extension)

> altair graphql(option)
https://altairgraphql.dev/
https://altair-gql.sirmuel.design
http://localhost:4000/


### movie REST api data
> chrome 
```
https://yts.mx/api/v2/list_movies.json
```

> server.js 편집

Movie type, query, resolvers

### graphqls
```gql
{
  allMovies {
    id
    title
    summary
    rating
    url
    background_image
  }
}

query ($movieId: Int!) {
  movie(id: $movieId) {
    id
    title
    summary
    rating
    url
    background_image
  }
}
```