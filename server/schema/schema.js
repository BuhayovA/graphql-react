const graphql = require('graphql');
const {GraphQLSchema} = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const movies = [
    {id: '1', name: 'One Flew Over the Cuckoo\'s Nest', genre: 'Drama'},
    {id: '2', name: 'Zodiac', genre: 'Detective'},
    {id: 3, name: 'The Girl with the Dragon Tattoo', genre: 'Detective'},
    {id: 4, name: 'The Curious Case of Benjamin Button', genre: 'Drama'},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return movies.find(movie => args.id == movie.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})