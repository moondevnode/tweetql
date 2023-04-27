import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id: "1",
        text: "first one!",
        userId: "2",
    },
    {
        id: "2",
        text: "second one!",
        userId: "1",
    }
]

let users = [
    {id: "1", userName: "kim", firstName: "Jungsam", lastName: "Moon"},
    {id: "2", userName: "park", firstName: "Young", lastName: "Lee"},
]


const typeDefs = gql`
    type User {
        id: ID!
        userName: String!
        firstName: String!
        lastName: String
        fullName: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User
    }
    type Query {
        allTweets: [Tweet!]
        tweet(id: ID!): Tweet
        allUsers: [User!]
    }
    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        
        },
        tweet(root, {id}) {
            // console.log(args);
            return tweets.find(tweet => tweet.id === id);
        },
        allUsers() {
            return users;
        },
    },
    Mutation: {
        postTweet(_, {text, userId}) {
            const newTweet = {
                id: tweets.length + 1,
                text,
                // author: userId
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
            // const tweetIndex = tweets.findIndex(tweet => tweet.id === id);
            // if (tweetIndex === -1) {
            //     return false;
            // }
            // tweets.splice(tweetIndex, 1);
            // return true;
        }
    },
    User: {
        fullName({firstName, lastName}) {
            return firstName + " " + lastName;
        }
    },
    Tweet: {
        author({userId}) {
            return users.find(user => user.id === userId);
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});

