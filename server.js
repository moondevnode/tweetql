import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch"; // NOTE: 없어도 됨

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
        """
        the sum of firstName and lastName as a string
        """
        fullName: String!
    }
    """
    Tweet object represents a resource for a tweet
    """
    type Tweet {
        id: ID!
        text: String!
        author: User
    }

    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String!
        yt_trailer_code: String!
        language: String!
        # mpa_rating: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
        # state: String!
        # torrents: String!
        # date_uploaded: String!
        # date_uploaded_unix: String!
    }

    type Query {
        allTweets: [Tweet!]
        tweet(id: ID!): Tweet
        allUsers: [User!]
        allMovies: [Movie!]
        movie(id: Int!): Movie
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        """
        Deletes a Tweet if found, else return false
        """
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
        allMovies() {
            return fetch("https://yts.mx/api/v2/list_movies.json")
                .then((r)=> r.json())
                .then(json=>json.data.movies);
        },
        movie(_, {id}) {
            return fetch("https://yts.mx/api/v2/movie_details.json?movie_id="+id)
                .then((r)=> r.json())
                .then(json=>json.data.movie);
        }
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

